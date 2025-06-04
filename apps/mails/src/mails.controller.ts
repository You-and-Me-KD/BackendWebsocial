import { MICRO_SERVICE_KEYS } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VerifyRegisterDto } from './dto/verify-register.dto';
import { MailService } from './mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern(MICRO_SERVICE_KEYS.MAILS.VERIFY_REGISTER)
  async verifyRegisterEmail(@Payload() data: VerifyRegisterDto) {
    return await this.mailService.sendVerifyRegister(data);
  }

  @MessagePattern(MICRO_SERVICE_KEYS.MAILS.FORGOT_PASSWORD)
  async forgotPasswordEmail(@Payload() data: ForgotPasswordDto) {
    return await this.mailService.sendForgotPassword(data);
  }
}
