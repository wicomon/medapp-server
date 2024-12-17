import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ){
    super({
      secretOrKey: configService.get('SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // rawTokken: ExtractJwt.fromHeader('token')
    })
  }

  // assign user to context
  async validate(payload: JwtPayload) {
    // console.log('jwt-strategy-----------------------------------')
    // console.log({payload})
    const {id} = payload;
    const user = await this.authService.validateUser(id);
    return user;
  }
}
