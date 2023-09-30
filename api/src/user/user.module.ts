import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserChaincode } from './user.chaincode';
import { FabricService } from 'src/fabric/fabric.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserChaincode, FabricService],
})
export class UserModule {}
