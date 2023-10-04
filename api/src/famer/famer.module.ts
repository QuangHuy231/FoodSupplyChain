import { Module } from '@nestjs/common';
import { FamerController } from './famer.controller';
import { FamerService } from './famer.service';
import { FabricModule } from 'src/fabric/fabric.module';

@Module({
  imports: [FabricModule],
  controllers: [FamerController],
  providers: [FamerService],
})
export class FamerModule {}
