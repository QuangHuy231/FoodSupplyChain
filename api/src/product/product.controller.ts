import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ProductService } from './product.service';

import { AuthGuard } from 'src/guard/auth.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async queryProduct(@Param('id') productId: string, @Req() req: any) {
    const user = req.user;
    return this.productService.queryProduct(productId, user);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') productId: string, @Req() req: any) {
    const user = req.user;
    return this.productService.deleteProduct(productId, user);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAllProducts(@Req() req: any) {
    const user = req.user;
    return this.productService.getAllProducts(user);
  }

  @UseGuards(AuthGuard)
  @Get('/get-history/:id')
  async getProductHistory(@Param('id') productId: string, @Req() req: any) {
    const user = req.user;
    return this.productService.getProductHistory(productId, user);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    return this.productService.uploadImage(image.buffer);
  }
}
