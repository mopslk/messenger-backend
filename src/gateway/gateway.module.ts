import { Module } from '@nestjs/common';
import { AppGateway } from '@/gateway/gateway';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports   : [AuthModule],
  providers : [AppGateway],
  exports   : [AppGateway],
})

export class GatewayModule {}
