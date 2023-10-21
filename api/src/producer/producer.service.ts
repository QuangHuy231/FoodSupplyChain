import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';
import { UpdateProductByProducerDto } from './dto/update-product-by-producer.dto';

@Injectable()
export class ProducerService {
  constructor(private fabricService: FabricService) {}
  async connect(userId: string) {
    const network = this.fabricService.connect(
      false,
      true,
      false,
      false,
      userId,
    );
    return network;
  }
  async getProductRecieved(user: any) {
    const network = await this.connect(user.UserId);
    const result = await this.fabricService.query(
      network,
      'queryProductsCreatedByFamerTransferToProducer',
      user.UserId,
    );
    return JSON.parse(result);
  }

  async updateProductByProducer(
    productId: string,
    updateProductByProducerDto: UpdateProductByProducerDto,
    user: any,
  ) {
    const network = await this.connect(user.UserId);
    try {
      const result = await this.fabricService.invoke(
        network,
        'UpdateProductByProducer',
        user.UserId,
        productId,
        updateProductByProducerDto.productionDate,
        updateProductByProducerDto.expirationDate,
        updateProductByProducerDto.productionSteps,
        updateProductByProducerDto.images,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException(
        'Error updating product by producer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async queryProductsOfProducerNotTransfer(user: any) {
    const network = await this.connect(user.UserId);
    const result = await this.fabricService.query(
      network,
      'queryProductsOfProducerNotTransfer',
      user.UserId,
    );
    return JSON.parse(result);
  }

  async transferProductToTransporter(
    productId: string,
    transportationId: string,
    user: any,
  ) {
    const network = await this.connect(user.UserId);
    try {
      const result = await this.fabricService.invoke(
        network,
        'TransferProductToTransporter',
        user.UserId,
        productId,
        transportationId,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException(
        'Transfer product to transport failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getProductOfProducer(user: any) {
    const network = await this.connect(user.UserId);
    const result = await this.fabricService.query(
      network,
      'GetProductOfProducer',
      user.UserId,
    );
    return JSON.parse(result);
  }
}
