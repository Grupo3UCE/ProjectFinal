import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MailService } from 'src/maile.service';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, MailService],
  imports:[NatsModule],
})
export class PaymentsModule {}
