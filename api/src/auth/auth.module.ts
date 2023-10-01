import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FabricService } from 'src/fabric/fabric.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FabricService],
})
export class AuthModule {}
