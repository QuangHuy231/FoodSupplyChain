import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserTypeDTO } from './dto/query-user-follow-usertype.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserInfo(@Param('id') userId: string, @Req() req: any) {
    const user = req.user;

    return this.userService.getUserInfo(userId, user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateUserInfo(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const user = req.user;
    return this.userService.updateUserInfo(userId, updateUserDto, user);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') userId: string, @Req() req: any) {
    const user = req.user;
    return this.userService.deleteUser(userId, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  queryListUserByUserType(@Body() userType: QueryUserTypeDTO, @Req() req: any) {
    const user = req.user;
    return this.userService.queryListUserByUserType(userType, user);
  }
}
