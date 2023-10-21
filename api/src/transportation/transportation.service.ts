import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';
import { TransferProductToRetailer } from './dto/transfer-product-to-retailer.dto';

@Injectable()
export class TransportationService {
  constructor(private fabricService: FabricService) {}
  async connect(userId: string) {
    const network = this.fabricService.connect(
      false,
      false,
      true,
      false,
      userId,
    );
    return network;
  }
  async getProductRecievedByTransportation(user: any) {
    const network = await this.connect(user.UserId);
    const result = await this.fabricService.query(
      network,
      'queryProductsOfTransportionNotTransfer',
      user.UserId,
    );
    return JSON.parse(result);
  }

  async transferProductToRetailer(
    user: any,
    productId: string,
    transferProductToRetailerDto: TransferProductToRetailer,
  ) {
    const network = await this.connect(user.UserId);
    try {
      const result = await this.fabricService.invoke(
        network,
        'TransferProductToRetailer',
        user.UserId,
        productId,
        transferProductToRetailerDto.retailerId,
        transferProductToRetailerDto.vehicle,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException(
        'Transfer product to Retailer failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductOfTransportation(user: any) {
    const network = await this.connect(user.UserId);
    const result = await this.fabricService.query(
      network,
      'GetProductOfTransportation',
      user.UserId,
    );
    return JSON.parse(result);
  }
}
