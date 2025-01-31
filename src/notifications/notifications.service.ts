import { Injectable } from '@nestjs/common';
import { AppGateway } from '@/gateway/gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private gateway: AppGateway,
  ) {}

  async sendSocketEvent(roomId: string[] | string, event: string, data?: any) {
    await this.gateway.sendNotification(roomId, event, data);
  }
}
