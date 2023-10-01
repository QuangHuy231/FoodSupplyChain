import { Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';

@Injectable()
export class UserService {
  constructor(private fabricService: FabricService) {}

  async getAllUsers() {
    const network = await this.fabricService.connect(
      true,
      false,
      false,
      false,
      'User43',
    );
    return this.fabricService.query(network, 'getCounter', 'UserCounterNO');
  }
}
