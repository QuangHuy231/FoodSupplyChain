import { Module } from '@nestjs/common';
import { FabricService } from './fabric.service';
import { FabricFactory } from './fabric.config';

@Module({
  providers: [FabricService, FabricFactory],
  exports: [FabricService],
})
export class FabricModule {}
