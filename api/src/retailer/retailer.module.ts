import { Module } from '@nestjs/common';
import { RetailerController } from './retailer.controller';
import { RetailerService } from './retailer.service';
import { FabricModule } from 'src/fabric/fabric.module';

@Module({
  imports: [FabricModule],
  controllers: [RetailerController],
  providers: [RetailerService],
})
export class RetailerModule {}
