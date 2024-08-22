import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mailBoi@gmail.com',
          pass: 'secret boi'
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
