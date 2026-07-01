import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTTokenModule } from "../jwtToken/jwtToken.module";

@Module({
  imports: [UsersModule, PassportModule, JWTTokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
