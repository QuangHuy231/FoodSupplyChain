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
import { AuthGuard } from '../guard/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/guard/admin.guard';

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
  ) {
    return this.userService.updateUserInfo(userId, updateUserDto);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/query-users-types/:userType')
  queryListUserByUserType(
    @Param('userType') userType: string,
    @Req() req: any,
  ) {
    console.log(userType);
    const user = req.user;
    return this.userService.queryListUserByUserType(userType, user);
  }

  @UseGuards(AdminGuard)
  @Get()
  getAllUsers(@Req() req: any) {
    const user = req.user;
    return this.userService.getAllUsers(user);
  }
}
