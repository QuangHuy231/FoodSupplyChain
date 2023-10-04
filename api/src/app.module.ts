import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { FamerModule } from './famer/famer.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, UserModule, ProductModule, FamerModule, ProducerModule],
})
export class AppModule {}
