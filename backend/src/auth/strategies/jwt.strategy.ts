import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from '../../types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const cookieExtractor = function (request) {
      console.log('Extracting jwt cookie');
      console.log(request.cookies);
      let token = null;
      if (request && request.cookies) {
        token = request.cookies['jwt'];
      }
      return token;
    };
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(tokenPayload: ITokenPayload) {
    console.log(tokenPayload);
    return { id: tokenPayload.id, email: tokenPayload.email };
  }
}
