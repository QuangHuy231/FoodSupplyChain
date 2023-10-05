import { Controller, Get, Param } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Controller('consumer')
export class ConsumerController {
  constructor(private consumerService: ConsumerService) {}

  @Get('/get-info-products/:productId')
  async getInfoProduct(@Param('productId') productId: string) {
    return this.consumerService.queryProduct(productId);
  }

  @Get('/get-history-products/:productId')
  async getHistoryProduct(@Param('productId') productId: string) {
    return this.consumerService.getProductHistory(productId);
  }

  @Get('/get-user-info/:userId')
  async getUserInfo(@Param('userId') userId: string) {
    return this.consumerService.getUserInfo(userId);
  }
}
