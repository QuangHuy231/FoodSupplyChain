import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { FabricModule } from 'src/fabric/fabric.module';

@Module({
  imports: [FabricModule],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
