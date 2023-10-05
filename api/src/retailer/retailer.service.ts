import { Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';

@Injectable()
export class RetailerService {
  constructor(private fabricService: FabricService) {}
  async connect(userId: string) {
    const network = this.fabricService.connect(
      false,
      false,
      false,
      true,
      userId,
    );
    return network;
  }
  async queryProductInRetailer(user: any) {
    const network = await this.connect(user.UserId);
    const result = await this.fabricService.query(
      network,
      'queryProductInRetailer',
      user.UserId,
    );
    return JSON.parse(result);
  }
}
