import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FabricService } from 'src/fabric/fabric.service';

@Injectable()
export class ConsumerService {
  constructor(private fabricService: FabricService) {}

  async queryProduct(productId: string) {
    const network = await this.fabricService.connectWithConsumer('Consumer');
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

  async getProductHistory(productId: string) {
    const network = await this.fabricService.connectWithConsumer('Consumer');
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

  async getUserInfo(userId: string) {
    const network = await this.fabricService.connectWithConsumer('Consumer');
    let userInfoString;
    try {
      userInfoString = await this.fabricService.query(
        network,
        'queryUserInfo',
        userId,
      );
    } catch (error) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const userInfo = JSON.parse(userInfoString);
    const { Password, ...otherInfo } = userInfo;

    return otherInfo;
  }
}
