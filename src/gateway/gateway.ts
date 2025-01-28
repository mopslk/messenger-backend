import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
    server: Server;

  constructor(private readonly jwtService: JwtService) {}

  // TODO: Рефактор, guards не применяются
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;
    if (!token) {
      client.disconnect();
    }

    try {
      const user = await this.jwtService.verify(token);

      client.join(user.sub);
    } catch (error) {
      client.disconnect();
    }
  }
}
