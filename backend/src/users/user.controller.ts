import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../jwtToken/guards/jwt-auth.guard";
import { UserRequest } from "./types/user.types";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  // GET /api/v1/user/profile
  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req: UserRequest) {
    return this.userService.userProfile(req.user.userId);
  }
}
