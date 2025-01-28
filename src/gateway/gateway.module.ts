import { Module } from '@nestjs/common';
import { ChatGateway } from '@/gateway/gateway';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports   : [AuthModule],
  providers : [ChatGateway],
})

export class GatewayModule {}
