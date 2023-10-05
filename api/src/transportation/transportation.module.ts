import { Module } from '@nestjs/common';
import { TransportationController } from './transportation.controller';
import { TransportationService } from './transportation.service';
import { FabricModule } from 'src/fabric/fabric.module';

@Module({
  imports: [FabricModule],
  controllers: [TransportationController],
  providers: [TransportationService],
})
export class TransportationModule {}
