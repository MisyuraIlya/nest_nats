import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nats = process.env.NATS_URL 
  console.log('nats',nats)
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [nats],
      timeout: 5000,
      reconnectAttempts: 5,
      reconnectTimeWait: 1000,
      waitOnFirstConnect: true,
    },
  });

  // Start the microservice
  await app.startAllMicroservices();
  console.log('Microservice connected via NATS is running!');

  // Start the main HTTP application
  await app.listen(3000);
  console.log('PRODUCER SERVICE IS RUNNING');
}

bootstrap();
