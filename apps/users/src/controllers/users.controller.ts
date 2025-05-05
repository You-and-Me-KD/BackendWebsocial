import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MICRO_SERVICE_KEYS, RegisterDto, AuthTokenDto } from '@app/common';
import { UsersService } from '../services';
import { GetUserDto } from '../dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(MICRO_SERVICE_KEYS.USERS.REGISTER)
  async register(@Payload() data: RegisterDto & { authTokens: AuthTokenDto }) {
    return await this.usersService.register(data);
  }

  @MessagePattern(MICRO_SERVICE_KEYS.USERS.FIND_ONE_USER)
  async findOneUser(@Payload() data: { email: string; username: string }) {
    return await this.usersService.findOne(data);
  }

  @MessagePattern(MICRO_SERVICE_KEYS.USERS.GET_USER)
  async getUser(@Payload() getUserDto: GetUserDto) {
    return await this.usersService.getUser(getUserDto);
  }

  @MessagePattern(MICRO_SERVICE_KEYS.USERS.VERIFY_TOKEN)
  async verifyToken(@Payload() data: { email: string }) {
    return await this.usersService.verifyToken(data);
  }
}
