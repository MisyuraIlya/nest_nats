import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('my.subject')
  handleNatsMessage(@Payload() message: any) {
    console.log('Received message from Producer:', message);
  }
}
