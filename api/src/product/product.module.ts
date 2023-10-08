import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { FabricModule } from 'src/fabric/fabric.module';
import { IpfsModule } from 'src/ipfs/ipfs.module';

@Module({
  imports: [FabricModule, IpfsModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
