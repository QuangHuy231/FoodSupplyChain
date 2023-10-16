import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private fabricService: FabricService) {}

  private async connect(userType: string, userId: string) {
    let network;

    if (userType === 'Famer' || userType === 'admin') {
      network = await this.fabricService.connect(
        true,
        false,
        false,
        false,
        userId,
      );
    }
    if (userType === 'Producer') {
      network = await this.fabricService.connect(
        false,
        true,
        false,
        false,
        userId,
      );
    }
    if (userType === 'Transportation') {
      network = await this.fabricService.connect(
        false,
        false,
        true,
        false,
        userId,
      );
    }
    if (userType === 'Retailer') {
      network = await this.fabricService.connect(
        false,
        false,
        false,
        true,
        userId,
      );
    }
    return network;
  }

  async getUserInfo(userId: string, user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    let userInfoString;
    try {
      userInfoString = await this.fabricService.query(
        network,
        'queryUserInfo',
        userId,
      );
    } catch (error) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const userInfo = JSON.parse(userInfoString);
    const { Password, ...otherInfo } = userInfo;

    return otherInfo;
  }

  async updateUserInfo(userId: string, updateUserDto: UpdateUserDto) {
    const network = await this.connect('Famer', 'admin');

    try {
      const result = await this.fabricService.invoke(
        network,
        'updateUser',
        userId,
        updateUserDto.UserName,
        updateUserDto.Email,
        updateUserDto.UserType,
        updateUserDto.Address,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(userId: string) {
    const network = await this.connect('Famer', 'admin');

    try {
      const result = await this.fabricService.invoke(
        network,
        'deleteUser',
        userId,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async queryListUserByUserType(userType: string, user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    const queryResultString = await this.fabricService.invoke(
      network,
      'queryListUserByUserType',
      userType,
    );

    const result = JSON.parse(queryResultString);
    return result;
  }

  async getAllUsers(user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    const queryResultString = await this.fabricService.query(
      network,
      'getAllUsers',
    );

    const result = JSON.parse(queryResultString);
    const filteredUsers = result.filter((user) => user.UserType !== 'admin');

    return filteredUsers;
  }
}
