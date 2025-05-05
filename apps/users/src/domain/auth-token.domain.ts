import { BaseDomain } from '@app/common/domain';
import { AUTH_TOKEN_TYPE_ENUM } from '../enums/auth-token.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDomain extends BaseDomain {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp',
    description: 'Verify register token',
  })
  token: string;

  @ApiProperty({
    type: Date,
    example: '2023-10-01T00:00:00.000Z',
    description: 'Token expiration date',
  })
  expiresAt: Date;

  @ApiProperty({
    type: Boolean,
    default: false,
    description: 'Indicates if the token is used',
  })
  isUsed?: boolean;

  @ApiProperty({
    type: String,
    enum: AUTH_TOKEN_TYPE_ENUM,
    example: AUTH_TOKEN_TYPE_ENUM.VERIFY_REGISTER,
    description: 'Type of the token',
  })
  type: AUTH_TOKEN_TYPE_ENUM;
}
