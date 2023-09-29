import { Controller, Get } from '@nestjs/common';
// import { UserRecord } from './user.record';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
