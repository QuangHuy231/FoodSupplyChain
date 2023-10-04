import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

import { FamerGuard } from 'src/guard/famer.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @UsePipes(ValidationPipe)
  @UseGuards(FamerGuard)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() req: any,
  ) {
    const user = req.user;
    return this.productService.createProduct(createProductDto, user);
  }

  @UseGuards(FamerGuard)
  @Get('/famer/product-created')
  async productCreated(@Req() req: any) {
    const user = req.user;
    return this.productService.productCreate(user);
  }
}
