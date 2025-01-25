import { Module } from '@nestjs/common';
import { ChatGateway } from '@/gateway/gateway';

@Module({
  providers: [ChatGateway],
})

export class GatewayModule {}
