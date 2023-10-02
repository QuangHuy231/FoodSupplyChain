import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { throwError } from 'rxjs';
import { QueryUserTypeDTO } from './dto/query-user-follow-usertype.dto';

@Injectable()
export class UserService {
  constructor(private fabricService: FabricService) {}

  private async connect(userType: string, userId: string) {
    let network;
    if (userType === 'Famer') {
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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const userInfo = JSON.parse(userInfoString);
    const { Password, ...otherInfo } = userInfo;

    return otherInfo;
  }

  async updateUserInfo(
    userId: string,
    updateUserDto: UpdateUserDto,
    user: any,
  ) {
    const network = await this.connect(user.UserType, user.UserId);

    try {
      await this.fabricService.invoke(
        network,
        'updateUser',
        userId,
        updateUserDto.UserName,
        updateUserDto.Email,
        updateUserDto.UserType,
        updateUserDto.Address,
      );
      throw new HttpException('Update Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(userId: string, user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    try {
      await this.fabricService.invoke(network, 'deleteUser', userId);
      throw new HttpException('Delete Success', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async queryListUserByUserType(userType: QueryUserTypeDTO, user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    const queryResultString = await this.fabricService.invoke(
      network,
      'queryListUserByUserType',
      userType.userType,
    );

    const result = JSON.parse(queryResultString);
    return result;
  }
}
