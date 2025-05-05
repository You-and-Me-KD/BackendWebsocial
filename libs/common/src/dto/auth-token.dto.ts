import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
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
}
