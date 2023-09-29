import { Injectable } from '@nestjs/common';
import { Contract } from 'fabric-network';
import { FabricService } from 'src/fabric/fabric.service';
@Injectable()
export class UserChaincode {
  protected contract: Contract;
  constructor(private fabricService: FabricService) {
    this.contract = this.fabricService.getContract();
  }

  public async getAllUsers() {
    const resultBuffer = await this.contract.evaluateTransaction(
      'QueryProduct',
      'product1',
    );
    return JSON.parse(resultBuffer.toString());
  }
}
