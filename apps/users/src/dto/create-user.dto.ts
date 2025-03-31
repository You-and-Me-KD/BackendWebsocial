import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { MARITIAL_ENUM } from '../enums';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'First name of user',
    required: false,
    example: 'John',
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last name of user',
    required: false,
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'User name of user',
    required: false,
    example: 'john_doe',
  })
  @IsString()
  @Length(6, 20)
  @Transform(({ value }) => value.trim())
  @Matches(/^[a-zA-Z0-9]+$/)
  username: string;

  @ApiProperty({
    type: String,
    description: 'Email of user',
    required: false,
    example: 'john_doe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Phone number of user',
    required: false,
    example: '+84912879856',
  })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'Language of user',
    required: false,
    example: 'en',
  })
  @IsString()
  @IsOptional()
  language: string;

  @ApiProperty({
    type: String,
    description: 'Address of user',
    required: false,
    example: '123 Main Street, New York, NY 10030',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    required: false,
    example: 'password',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[!@#$%^&*]/, {
    message: 'Password must contain at least one special character (!@#$%^&*)',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Description of user',
    required: false,
    example: 'This is a description',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    description: 'Tag line of user',
    required: false,
    example: 'This is a tag line',
  })
  @IsString()
  @IsOptional()
  tagLine: string;

  @ApiProperty({
    type: String,
    description: 'Public email of user',
    required: false,
    example: 'john@var-meta.com',
  })
  @IsEmail()
  @IsString()
  @IsOptional()
  publicEmail: string;

  @ApiProperty({
    type: String,
    description: 'Public website of user',
    required: false,
    example: 'https://var-meta.com',
  })
  @IsString()
  @IsOptional()
  publicWebsite: string;

  @ApiProperty({
    type: Date,
    description: 'Birth date of user',
    required: false,
    example: '1999-12-31',
  })
  @IsDate()
  @IsOptional()
  birthDate: Date;

  @ApiProperty({
    type: String,
    description: 'Major of user',
    required: false,
    example: 'Computer Science',
  })
  @IsString()
  @IsOptional()
  major: string;

  @ApiProperty({
    type: String,
    description: 'Marital status of user',
    required: false,
    example: MARITIAL_ENUM.SINGLE,
  })
  @IsEnum(MARITIAL_ENUM)
  @IsOptional()
  martialStatus: MARITIAL_ENUM;

  @ApiProperty({
    type: String,
    description: 'Birth place of user',
    required: false,
    example: 'New York, USA',
  })
  @IsString()
  @IsOptional()
  birthPlace: string;

  @ApiProperty({
    type: String,
    description: 'PS ID of user',
    required: false,
    example: '123456789',
  })
  @IsString()
  @IsOptional()
  psId: string;

  @ApiProperty({
    type: String,
    description: 'XB ID of user',
    required: false,
    example: '123456789',
  })
  @IsString()
  @IsOptional()
  xbId: string;

  @ApiProperty({
    type: Number,
    description: 'Level of user',
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  level: number;

  @ApiProperty({
    type: Number,
    description: 'Experience of user',
    required: false,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  exp: number;

  @ApiProperty({
    type: Number,
    description: 'Follower count of user',
    required: false,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  followerCount: number;

  @ApiProperty({
    type: Number,
    description: 'Following count of user',
    required: false,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  followingCount: number;

  @ApiProperty({
    type: Number,
    description: 'Post count of user',
    required: false,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  postCount: number;

  @ApiProperty({
    type: Number,
    description: 'Comment count of user',
    required: false,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  commentCount: number;

  @ApiProperty({
    type: Number,
    description: 'Visit count of user',
    required: false,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  visitCount: number;

  @ApiProperty({
    type: Number,
    description: 'React count of user',
    required: false,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  reactCount: number;

  @ApiProperty({
    type: Number,
    description: 'Share count of user',
    required: false,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  shareCount: number;

  @ApiProperty({
    type: Boolean,
    description: 'Get latest news',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isGetLastestNews: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Notify comment',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isNotifyComment: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Get new by mail',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isGetNewByMail: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Notify group',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isNotifyGroup: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Notify tag',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isNotifyTag: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Notify friend request',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isNotifyFriendRequest: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Notify event',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isNotifyEvent: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Notify market',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isNotifyMarket: boolean;

  @ApiProperty({
    type: String,
    description: 'Stream description',
    required: false,
    example: 'This is a stream description',
  })
  @IsString()
  @IsOptional()
  streamDescription: string;

  /*
        - NEED UPDATE
        - Related with table: avatars
      */
  @ApiProperty({
    type: String,
    description: 'Avatar ID',
    required: false,
    example: '123456789',
  })
  @IsString()
  @IsOptional()
  avatarId: string;

  @ApiProperty({
    type: String,
    description: 'Banner ID',
    required: false,
    example: '123456789',
  })
  @IsString()
  @IsOptional()
  bannerId: string;

  @ApiProperty({
    type: String,
    description: 'Country ID',
    required: false,
    example: '123456',
  })
  @IsString()
  @IsOptional()
  countryId: string;

  @ApiProperty({
    type: String,
    description: 'City ID',
    required: false,
    example: '123456',
  })
  @IsString()
  @IsOptional()
  cityId: string;
}
