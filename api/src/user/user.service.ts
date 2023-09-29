import { Injectable } from '@nestjs/common';
import { UserChaincode } from './user.chaincode';

@Injectable()
export class UserService {
  constructor(private userChaincode: UserChaincode) {}

  getAllUsers() {
    return this.userChaincode.getAllUsers();
  }
}
