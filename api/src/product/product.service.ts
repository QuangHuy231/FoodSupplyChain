import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';

@Injectable()
export class ProductService {
  constructor(private fabricService: FabricService) {}
  private async connect(userType: string, userId: string) {
    let network;
    if (userType === 'Famer' || userType === 'admin') {
      network = await this.fabricService.connect(
        true,
        false,
        false,
        false,
        userId,
      );
    }
    if (userType === 'Producer') {
      network = await this.fabricService.connect(
        false,
        true,
        false,
        false,
        userId,
      );
    }
    if (userType === 'Transportation') {
      network = await this.fabricService.connect(
        false,
        false,
        true,
        false,
        userId,
      );
    }
    if (userType === 'Retailer') {
      network = await this.fabricService.connect(
        false,
        false,
        false,
        true,
        userId,
      );
    }
    return network;
  }

  async queryProduct(productId: string, user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    try {
      const result = await this.fabricService.query(
        network,
        'QueryProduct',
        productId,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllProducts(user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    const result = await this.fabricService.query(network, 'GetAllProducts');
    return JSON.parse(result);
  }

  async deleteProduct(productId: string, user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    try {
      const result = await this.fabricService.invoke(
        network,
        'deleteProduct',
        productId,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async getProductHistory(productId: string, user: any) {
    const network = await this.connect(user.UserType, user.UserId);
    try {
      const result = await this.fabricService.query(
        network,
        'GetProductHistory',
        productId,
      );
      return JSON.parse(result);
    } catch (error) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
