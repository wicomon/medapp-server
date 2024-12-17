import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor(protected readonly configService: ConfigService) {
    // console.log('refresh token constructor')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    // console.log({ payload });
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    console.log({ ...payload, refreshToken })
    return { ...payload, refreshToken };
  }
}
