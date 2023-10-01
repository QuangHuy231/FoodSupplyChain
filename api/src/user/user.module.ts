import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { FabricService } from 'src/fabric/fabric.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FabricService],
})
export class UserModule {}
