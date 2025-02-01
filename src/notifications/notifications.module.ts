import { NotificationsService } from '@/notifications/notifications.service';
import { Module } from '@nestjs/common';
import { GatewayModule } from '@/gateway/gateway.module';

@Module({
  imports   : [GatewayModule],
  providers : [NotificationsService],
  exports   : [NotificationsService],
})

export class NotificationsModule {}
