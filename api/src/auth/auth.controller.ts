import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const token = await this.authService.login(loginUserDto);
    return res.status(200).json({
      access_token: token,
    });
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}