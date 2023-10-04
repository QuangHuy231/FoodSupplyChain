import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProducerGuard } from 'src/guard/producer.guard';
import { ProducerService } from './producer.service';
import { UpdateProductByProducerDto } from './dto/update-product-by-producer.dto';

@Controller('producer')
export class ProducerController {
  constructor(private producerService: ProducerService) {}
  @UseGuards(ProducerGuard)
  @Get('/producer-recived')
  async getProductRecived(@Req() req: any) {
    const user = req.user;
    return this.producerService.getProductRecieved(user);
  }

  @UseGuards(ProducerGuard)
  @Put('/update-product-by-producer/:productId')
  async updateProductByProducer(
    @Body() updateProductByProducerDto: UpdateProductByProducerDto,
    @Param('productId') productId: string,
    @Req() req: any,
  ) {
    const user = req.user;
    return this.producerService.updateProductByProducer(
      productId,
      updateProductByProducerDto,
      user,
    );
  }

  @UseGuards(ProducerGuard)
  @Get('/product-in-producer')
  async queryProductsOfProducerNotTransfer(@Req() req: any) {
    const user = req.user;
    return this.producerService.queryProductsOfProducerNotTransfer(user);
  }

  @UseGuards(ProducerGuard)
  @Put('/transfer-product-to-transportation/:productId/:transportationId')
  async transferProductToTransportation(
    @Param('productId') productId: string,
    @Param('transportationId') transportationId: string,
    @Req() req: any,
  ) {
    console.log(transportationId);
    const user = req.user;
    return this.producerService.transferProductToTransporter(
      productId,
      transportationId,
      user,
    );
  }
}
