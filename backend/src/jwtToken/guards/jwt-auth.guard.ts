import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Attach this with @UseGuards(JwtAuthGuard) on any route that should
// require a valid, non-expired JWT in the Authorization header.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
