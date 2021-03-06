import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwTPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwTPayload) {
    const { username } = payload;
    const user = this.userRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
