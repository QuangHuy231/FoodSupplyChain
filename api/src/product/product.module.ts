import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { FabricModule } from 'src/fabric/fabric.module';

@Module({
  imports: [FabricModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
