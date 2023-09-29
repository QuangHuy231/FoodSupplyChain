import { Inject } from '@nestjs/common';
import { Fabric } from './fabric.type';

export class FabricService {
  constructor(@Inject('FABRIC_CONFIG') private readonly fabric: Fabric) {}

  getContract() {
    return this.fabric.network.getContract('chaincode');
  }
}
