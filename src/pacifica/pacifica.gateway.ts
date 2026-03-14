import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import * as WebSocket from 'ws';

@WebSocketGateway()
export class PacificaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(PacificaGateway.name);
  private ws: WebSocket;
  public latestPrice: number = 0;

  // Этот метод сработает, как только наш backend запустится
  afterInit() {
    this.logger.log('Pacifica Gateway Initialized. Connecting to WebSocket...');
    this.connect();
  }

  connect() {
    // ВАЖНО: Этот URL нужно будет заменить на реальный WebSocket URL от Pacifica
    // Я предполагаю, что он может выглядеть так, но нужно уточнить в документации.
    const pacificaWsUrl = 'wss://api.pacifica.exchange/v1/stream'; // Пример!

    this.ws = new WebSocket(pacificaWsUrl);

    this.ws.on('open', () => {
      this.logger.log('Connected to Pacifica WebSocket!');
      // После подключения, подписываемся на поток цен BTC
      this.ws.send(JSON.stringify({
        op: 'subscribe',
        channel: 'ticker',
        market: 'BTC-USD'
      }));
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      try {
        const message = JSON.parse(data.toString());
        // Ищем в сообщении цену. Структура может быть другой!
        if (message.channel === 'ticker' && message.data?.last) {
          this.latestPrice = parseFloat(message.data.last);
          // Просто выводим в лог, чтобы видеть, что цены приходят
          this.logger.log(`New BTC Price: ${this.latestPrice}`);
        }
      } catch (error) {
        this.logger.error('Failed to parse WebSocket message', error);
      }
    });

    this.ws.on('error', (error) => {
      this.logger.error('Pacifica WebSocket error:', error);
    });

    this.ws.on('close', () => {
      this.logger.warn('Pacifica WebSocket connection closed. Reconnecting in 5 seconds...');
      setTimeout(() => this.connect(), 5000); // Пытаемся переподключиться через 5 сек
    });
  }

  handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
