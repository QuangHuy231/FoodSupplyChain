import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FamerService } from './famer.service';
import { FamerGuard } from 'src/guard/famer.guard';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('famer')
export class FamerController {
  constructor(private famerService: FamerService) {}
  @UsePipes(ValidationPipe)
  @UseGuards(FamerGuard)
  @Post('/create-product')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() req: any,
  ) {
    const user = req.user;
    return this.famerService.createProduct(createProductDto, user);
  }

  @Get('/product-created')
  @UseGuards(FamerGuard)
  async productCreated(@Req() req: any) {
    const user = req.user;
    return this.famerService.productCreated(user);
  }

  @Put('/transfer-producer/:productId/:producerId')
  @UseGuards(FamerGuard)
  async transferToProducer(
    @Param('productId') productId: string,
    @Param('producerId') producerId: string,
    @Req() req: any,
  ) {
    const user = req.user;
    return this.famerService.transferProductToProducer(
      productId,
      producerId,
      user,
    );
  }

  @Get('/product-of-famer')
  @UseGuards(FamerGuard)
  async getProductOfFamer(@Req() req: any) {
    const user = req.user;
    return this.famerService.getProductOfFamer(user);
  }
}
