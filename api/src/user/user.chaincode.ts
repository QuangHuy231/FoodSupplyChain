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
      false,
      'user2Producer',
    );
    return this.fabricService.invoke(
      network,
      'createUser',
      '4',
      'huy',
      'nguyenquanghuya3kd@gmail.com',
      'Famer',
      'BinhDinh',
      '2311',
    );
  }
}
