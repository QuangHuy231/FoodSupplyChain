import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { FabricService } from 'src/fabric/fabric.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private fabricService: FabricService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async generateToken(payload: { id: string }) {
    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async register(registerUserDto: RegisterUserDto) {
    let network;
    if (registerUserDto.UserType === 'Famer') {
      await this.fabricService.enrollAdmin(true, false, false, false);
      network = await this.fabricService.connect(
        true,
        false,
        false,
        false,
        'admin',
      );
    }
    if (registerUserDto.UserType === 'Producer') {
      await this.fabricService.enrollAdmin(true, false, false, false);
      network = await this.fabricService.connect(
        false,
        true,
        false,
        false,
        'admin',
      );
    }
    if (registerUserDto.UserType === 'Transportation') {
      await this.fabricService.enrollAdmin(true, false, false, false);
      network = await this.fabricService.connect(
        false,
        false,
        true,
        false,
        'admin',
      );
    }
    if (registerUserDto.UserType === 'Retailer') {
      await this.fabricService.enrollAdmin(true, false, false, false);
      network = await this.fabricService.connect(
        false,
        false,
        false,
        true,
        'admin',
      );
    }
    const hashPassword = await this.hashPassword(registerUserDto.Password);
    const userId = await this.fabricService.invoke(
      network,
      'createUser',
      registerUserDto.UserName,
      registerUserDto.Email,
      registerUserDto.UserType,
      registerUserDto.Address,
      hashPassword,
    );

    if (registerUserDto.UserType === 'Famer') {
      await this.fabricService.registerUser(
        true,
        false,
        false,
        false,
        userId.toString(),
      );
    }
    if (registerUserDto.UserType === 'Producer') {
      await this.fabricService.registerUser(
        false,
        true,
        false,
        false,
        userId.toString(),
      );
    }
    if (registerUserDto.UserType === 'Transportation') {
      await this.fabricService.registerUser(
        false,
        false,
        true,
        false,
        userId.toString(),
      );
    }
    if (registerUserDto.UserType === 'Retailer') {
      await this.fabricService.registerUser(
        false,
        false,
        false,
        true,
        userId.toString(),
      );
    }

    return `Create User with userId: ${userId.toString()}`;
  }

  async login(loginUserDto: LoginUserDto) {
    let network;
    if (loginUserDto.userType === 'Famer') {
      network = await this.fabricService.connect(
        true,
        false,
        false,
        false,
        loginUserDto.userId,
      );
    }
    if (loginUserDto.userType === 'Producer') {
      network = await this.fabricService.connect(
        false,
        true,
        false,
        false,
        loginUserDto.userId,
      );
    }
    if (loginUserDto.userType === 'Transportation') {
      network = await this.fabricService.connect(
        false,
        false,
        true,
        false,
        loginUserDto.userId,
      );
    }
    if (loginUserDto.userType === 'Retailer') {
      network = await this.fabricService.connect(
        false,
        false,
        false,
        true,
        loginUserDto.userId,
      );
    }
    const user = await this.fabricService.query(
      network,
      'queryUserInfo',
      loginUserDto.userId,
    );

    const userInfo = JSON.parse(user);

    if (!userInfo) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatching = await bcrypt.compare(
      loginUserDto.password,
      userInfo.Password,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return await this.generateToken(userInfo.UserId);
  }
}
