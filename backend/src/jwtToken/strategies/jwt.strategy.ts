import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

interface JwtPayload {
  sub: string; // user id
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      // Reads the token from: Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // false (the default) means passport-jwt REJECTS expired tokens
      // automatically, before validate() below even runs.
      ignoreExpiration: false,

      secretOrKey: config.get<string>("JWT_SECRET"),
    });
  }

  // Runs only if the signature is valid AND the token isn't expired.
  // Whatever this returns becomes `request.user` in your controllers.
  async validate(payload: JwtPayload) {
    if (!payload?.sub || !payload?.email) {
      throw new UnauthorizedException("Invalid token payload");
    }

    return { userId: payload.sub, email: payload.email };
  }
}
