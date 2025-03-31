import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MICRO_SERVICE_KEYS, RegisterDto } from '@app/common';
import { GetUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(MICRO_SERVICE_KEYS.USERS.REGISTER)
  async register(@Payload() registerDto: RegisterDto) {
    return await this.usersService.register(registerDto);
  }

  @MessagePattern(MICRO_SERVICE_KEYS.USERS.FIND_ONE_USER)
  async findOneUser(@Payload() data: { email: string; username: string }) {
    return await this.usersService.findOne(data);
  }

  @MessagePattern(MICRO_SERVICE_KEYS.USERS.GET_USER)
  async getUser(@Payload() getUserDto: GetUserDto) {
    return await this.usersService.getUser(getUserDto);
  }
}
