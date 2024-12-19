import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/common/services/email.service';
import { AuthResponse, LoginInput, RestorePasswordInput } from './dto';
import * as encrypter from 'bcryptjs';
import { ResetPasswordInput } from './dto/inputs/resetPwd.input';
import { JwtService } from '@nestjs/jwt';
import { ContextUser } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    // private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  private getJwtToken(userId: number) {
    return this.jwtService.sign({ id: userId, msg: 'generated' });
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    // console.log(loginInput)
    const { nickName, password } = loginInput;

    const user = await this.prisma.user.findFirst({
      where: {nickName, isDeleted: false},
    });
    if (!user) throw new BadRequestException('Email/password incorrectos');
    // if (!user.UserProfile || user.UserProfile.length <= 0) throw new BadRequestException('No tiene perfiles asignados');
    // console.log(user);
    // console.log(user.UserProfile)
    // console.log(user.UserProfile[0].SystemProfile);
    // const profiles = user.UserProfile.map(prof => prof.SystemProfile.Module);
    // console.log({profiles});
    // console.log(profiles.some(prof => prof.description=='FFM WEB'))
    // if(!profiles.some(prof => prof.description=='FFM WEB')) throw new BadRequestException('No tiene permiso para web');
    
    if (!encrypter.compareSync(password, user.password)) throw new BadRequestException('Email/password incorrectos');

    if (!user.isActive) throw new BadRequestException('Usuario desactivado');
    
    const token = this.getJwtToken(user.id);

    // console.log({user})
    return {
      token,
      // user,
    };
  }

  async validateToken(contextUser: ContextUser) {
    // console.log('validate user service called')
    return contextUser;
  }

  async restorePassword(restorePasswordInput: RestorePasswordInput): Promise<boolean> {
    // console.log(loginInput)
    const { nickName } = restorePasswordInput;
    const user = await this.prisma.user.findFirst({where: {nickName: nickName.trim()}});
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const frontUrl = this.configService.get<string>('FRONT_URL');


    const token = this.getJwtToken(user.id);

    // await this.prisma.resetPassword.updateMany({
    //   where: {
    //     email: nickName,
    //   },
    //   data: {
    //     status: true,
    //   },
    // });

    // const template = restorePasswordTemplate({
    //   url: frontUrl + '/auth/restore/' + token,
    //   // name: AES.decrypt(user.firstName, secret).toString(enc.Utf8),
    // });
    // this.emailService.sendEmail({
    //   emailTitle: 'FFM APP',
    //   emailSubject: '¿Olvidó su contraseña?',
    //   emailReciever: nickName.trim(),
    //   template: template,
    // });

    // console.log({user})
    return true;
  }

  async validateUser(idUser: number) {
    // console.log('validate user service called')
    const user = await this.prisma.user.findUnique({
      where:{id: idUser},
    });
    // console.log('validate-user',user)
    if(!user) throw new NotFoundException('User not found');
    if (!user.isActive) throw new UnauthorizedException('User inactive');

    return user;
  }

  revalidateToken(user: ContextUser): AuthResponse {
    const token = this.getJwtToken(user.id);

    return {
      token,
    };
  }

  async refreshTokens(idUser: number, refreshToken: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: idUser },
      // include: { Profile: true },
    });
    // if (!user || !user.refreshToken)
    //   throw new ForbiddenException('Access Denied');
    // const refreshTokenMatches = await encrypter.compare(
    //   refreshToken,
    //   user.refreshToken,
    // );
    // if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user);
    await this.updateToken(idUser, tokens.refresh_token);
    return tokens;
  }

  protected async updateToken(idUser, refreshToken) {
    const salt = encrypter.genSaltSync();
    const hashedRefreshToken = encrypter.hashSync(refreshToken.trim(), salt);

    // await this.prisma.user.update({
    //   where: { id: idUser },
    //   data: { refreshToken: hashedRefreshToken },
    // });
  }

  protected async getTokens(user) {
    const token = this.getJwtToken(
      user.idUser.toString(),
      // this.configService.get<string>('jwt.expiration'),
      // user.Profile.description,
      // this.configService.get<string>('jwt.access_token'),
    );

    const refresh_token: string = this.getJwtToken(
      user.idUser.toString(),
      // this.configService.get<string>('jwt.refresh_expiration'),
      // user.Profile.description,
      // this.configService.get<string>('jwt.refresh_token'),
    );

    return {
      refresh_token,
      token,
    };
  }

  async resetPassword (resetPwdInput: ResetPasswordInput, contextUser: ContextUser) {
    const { idUser } = resetPwdInput;

    const existUser = await this.prisma.user.findFirst({
      where: {id: idUser}
    });

    if (!existUser) throw new BadRequestException('Email/password incorrectos');
    
    const newPassword = (Math.random() + 1).toString(36).substring(3);

    const salt = encrypter.genSaltSync();
    const encryptedPassword = encrypter.hashSync(newPassword.trim(), salt);
    
    // await this.prisma.user.update({
    //   data: {password: encryptedPassword, updateAt: new Date(), updateBy: contextUser.idUser},
    //   where: {idUser: existUser.idUser}
    // });

    // console.log("random:", newPassword);
    return newPassword;
  }
}
