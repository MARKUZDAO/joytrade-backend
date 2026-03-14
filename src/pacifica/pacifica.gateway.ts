import { WebSocketGateway, OnGatewayInit } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import WebSocket from 'ws'; // Исправленный, правильный способ импорта

@WebSocketGateway()
export class PacificaGateway implements OnGatewayInit {
  private readonly logger = new Logger(PacificaGateway.name);
  private ws: WebSocket;
  public latestBtcPrice: number = 0;

  // Этот метод сработает, как только наш backend запустится
  afterInit() {
    this.logger.log('Pacifica Gateway Initialized. Connecting to Testnet WebSocket...');
    this.connect();
  }

  connect() {
    // Правильный URL для Тестнета из вашей документации
    const pacificaTestnetWsUrl = 'wss://test-ws.pacifica.fi/ws';

    this.ws = new WebSocket(pacificaTestnetWsUrl);

    this.ws.on('open', () => {
      this.logger.log('SUCCESS: Connected to Pacifica Testnet WebSocket!');
      
      // Отправляем правильное сообщение для подписки на цены
      const subscriptionMessage = {
        method: 'subscribe',
        params: {
          source: 'prices'
        }
      };

      this.ws.send(JSON.stringify(subscriptionMessage));
      this.logger.log('Subscription message sent: ' + JSON.stringify(subscriptionMessage));
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      try {
        const message = JSON.parse(data.toString());
        
        // Ищем в сообщении наш канал "prices"
        if (message.channel === 'prices' && message.data) {
          
          // message.data - это массив. Ищем в нем объект для BTC.
          const btcData = message.data.find(item => item.symbol === 'BTC');

          if (btcData) {
            // Используем "mark price" как основную цену
            this.latestBtcPrice = parseFloat(btcData.mark);
            // Просто выводим в лог, чтобы видеть, что цены приходят
            // Логируем не каждую цену, а раз в 2 секунды, чтобы не засорять лог
            if (Math.random() < 0.1) { // Это простой способ логировать реже
               this.logger.log(`New BTC Mark Price: ${this.latestBtcPrice}`);
            }
          }
        }
      } catch (error) {
        this.logger.error('Failed to parse WebSocket message', error);
      }
    });

    this.ws.on('error', (error) => {
      this.logger.error('Pacifica WebSocket error:', error.message);
    });

    this.ws.on('close', (code, reason) => {
      this.logger.warn(`Pacifica WebSocket connection closed. Code: ${code}, Reason: ${reason}. Reconnecting in 5 seconds...`);
      setTimeout(() => this.connect(), 5000); // Пытаемся переподключиться через 5 сек
    });
  }
}
