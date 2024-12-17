import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/common/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AES, enc } from 'crypto-js';
import * as encrypter from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findOne(id: number) {
    const existsUser = await this.prisma.user.findFirst({where:{id}});
    if(!existsUser) throw new NotFoundException('User not found');
    return existsUser;
  }

  async findAll() {
    return await this.prisma.user.findMany({})
  }

  async create(createUserInput: CreateUserInput) {
    const {
      email,
      firstName,
      lastName,
      nickName,
      password,
      image
    } = createUserInput;
    // const secret = this.configService.get<string>('SECRET');
    const existUser = await this.prisma.user.findFirst({
      where: { nickName: nickName.trim(), isActive: true },
    });
    // console.log(existUser)
    if(existUser) throw new BadRequestException('Usuario '+nickName+' ya existe');

    const salt = encrypter.genSaltSync();
    const encryptedPassword = encrypter.hashSync(password.trim(), salt);

    const newUser = await this.prisma.user.create({
      data:{
        firstName: firstName.trim(), 
        lastName: lastName.trim(), 
        nickName: nickName.trim(), 
        email: email.trim(), 
        password: encryptedPassword,
        image,
        // createdBy: conte
      }
    });

    return true;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
