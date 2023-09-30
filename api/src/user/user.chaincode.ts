import { Injectable } from '@nestjs/common';

import { FabricService } from 'src/fabric/fabric.service';
@Injectable()
export class UserChaincode {
  constructor(private fabricService: FabricService) {}

  public async getAllUsers() {
    const network = await this.fabricService.connect(
      true,
      false,
      false,
      'user1Producer',
    );
    return this.fabricService.query(network, 'QueryProduct');
  }
}
