import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransportationService } from './transportation.service';
import { TransportationGuard } from 'src/guard/transportation.guard';
import { TransferProductToRetailer } from './dto/transfer-product-to-retailer.dto';

@Controller('transportation')
export class TransportationController {
  constructor(private transportationSevice: TransportationService) {}
  @UseGuards(TransportationGuard)
  @Get('/transportation-recieved')
  async getProductRecived(@Req() req: any) {
    const user = req.user;
    return this.transportationSevice.getProductRecievedByTransportation(user);
  }

  @UseGuards(TransportationGuard)
  @UsePipes(ValidationPipe)
  @Put('/transfer-product-to-retailer/:productId')
  async transferProductToTransportation(
    @Param('productId') productId: string,
    @Body() transferProductToRetailer: TransferProductToRetailer,
    @Req() req: any,
  ) {
    const user = req.user;
    return this.transportationSevice.transferProductToRetailer(
      user,
      productId,
      transferProductToRetailer,
    );
  }

  @Get('/product-of-transportation')
  @UseGuards(TransportationGuard)
  async getProductOfFamer(@Req() req: any) {
    const user = req.user;
    return this.transportationSevice.getProductOfTransportation(user);
  }
}
