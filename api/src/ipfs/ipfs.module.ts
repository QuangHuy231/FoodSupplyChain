import { Module } from '@nestjs/common';
import { IpfsFactory } from './ipfs.config';
import { IpfsService } from './ipfs.service';

@Module({
  providers: [IpfsService, IpfsFactory],
  exports: [IpfsService],
})
export class IpfsModule {}
