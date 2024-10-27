import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  async sendMessage() {
    return new Promise((resolve, reject) => {
      this.client
        .emit('my.subject', { text: 'Hello from Producer!' })
        .subscribe({
          next: (response) => resolve({ message: 'Message sent to NATS', response }),
          error: (err) => reject(err),
        });
    });
  }
}
