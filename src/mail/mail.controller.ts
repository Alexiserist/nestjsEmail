import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailDto } from './dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService
  ) {}

  @Post()
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @Post('sendemail')
  async sendMail(@Body() sendMail: MailDto){
    let {to,from,subject,text} = sendMail
    try{
      await this.mailerService.sendMail({
        to: to,
        from: from,
        subject: subject,
        text: text
      })
      return {
        message: 'success sent'
      }
    }catch(ex:any){
      console.log(ex);
      throw ex;
    }
  }

  @Get()
  findAll() {
    return this.mailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
    return this.mailService.update(+id, updateMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}
