import { MICRO_SERVICE_KEYS } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VerifyRegisterDto } from './dto/verify-register.dto';
import { MailService } from './mail/mail.service';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern(MICRO_SERVICE_KEYS.MAILS.VERIFY_REGISTER)
  async verifyRegisterEmail(@Payload() data: VerifyRegisterDto) {
    return await this.mailService.sendVerifyRegister(data);
  }
}
