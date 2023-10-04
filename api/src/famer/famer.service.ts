import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class FamerService {
  constructor(private fabricService: FabricService) {}
  private async connect(userId: string) {
    const network = await this.fabricService.connect(
      true,
      false,
      false,
      false,
      userId,
    );
    return network;
  }
  async createProduct(createProductDto: CreateProductDto, user: any) {
    const network = await this.connect(user.UserId);

    try {
      const result = await this.fabricService.invoke(
        network,
        'CreateProduct',
        createProductDto.productName,
        user.UserId,
        createProductDto.plantDate,
        createProductDto.harvestDate,
        createProductDto.images,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException('Error Create Product', HttpStatus.BAD_REQUEST);
    }
  }
  async productCreated(user: any) {
    const network = await this.connect(user.UserId);
    const result = await this.fabricService.query(
      network,
      'queryProductsCreatedByFarmerNotTransferred',
      user.UserId,
    );
    return JSON.parse(result);
  }

  async transferProductToProducer(
    productId: string,
    producerId: string,
    user: any,
  ) {
    const network = await this.connect(user.UserId);
    try {
      const result = await this.fabricService.invoke(
        network,
        'TransferProductToProducer',
        user.UserId,
        productId,
        producerId,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException(
        'Transfer product to producer failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
