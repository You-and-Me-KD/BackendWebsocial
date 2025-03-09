import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { MARITIAL_ENUM } from '../enums';

export class UserDomain {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID type by UUID',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'John',
    description: 'First name of the user',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    description: 'Last name of the user',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    example: 'johndoe',
    description: 'Username of the user',
  })
  userName: string;

  @ApiProperty({
    type: String,
    example: 'johndoe@gmail.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    type: String,
    example: '+84912879856',
    description: 'Phone number of the user',
  })
  phoneNumber: string;

  @ApiProperty({
    type: String,
    example: 'en',
    description: 'Language of the user',
  })
  language: string;

  @ApiProperty({
    type: String,
    example: '123 Main Street, New York, NY 10030',
    description: 'Address of the user',
  })
  address: string;

  @ApiProperty({
    type: String,
    example: 'hasedPassword',
    description: 'Hashed password of the user',
  })
  @Exclude()
  hashedPassword: string;

  @ApiProperty({
    type: String,
    example: 'This is a description',
    description: 'Description of the user',
  })
  description: string;

  @ApiProperty({
    type: String,
    example: 'This is a tag line',
    description: 'Tag line of the user',
  })
  tagLine: string;

  @ApiProperty({
    type: String,
    example: 'jonedeo@gmail.com',
    description: 'Public email of the user',
  })
  publicEmail: string;

  @ApiProperty({
    type: String,
    example: 'https://johndoe.com',
    description: 'Public website of the user',
  })
  publicWebsite: string;

  @ApiProperty({
    type: Date,
    example: '1990-01-01',
    description: 'Birth date of the user',
  })
  birthDate: Date;

  @ApiProperty({
    type: String,
    example: 'Computer Science',
    description: 'Major of the user',
  })
  major: string;

  @ApiProperty({
    type: String,
    example: MARITIAL_ENUM.MARRIED,
    description: 'Marital status of the user',
  })
  martialStatus: MARITIAL_ENUM;

  @ApiProperty({
    type: String,
    example: 'New York, NY',
    description: 'Birth place of the user',
  })
  birthPlace: string;

  @ApiProperty({
    type: String,
    example: '123456',
    description: 'PS ID of the user',
  })
  psId: string;

  @ApiProperty({
    type: String,
    example: '123456',
    description: 'XB ID of the user',
  })
  xbId: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Level of the user',
  })
  level: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Experience of the user',
  })
  exp: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Follower count of the user',
  })
  followerCount: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Following count of the user',
  })
  followingCount: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Post count of the user',
  })
  postCount: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Comment count of the user',
  })
  commentCount: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Visit count of the user',
  })
  visitCount: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'React count of the user',
  })
  reactCount: number;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Share count of the user',
  })
  shareCount: number;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is get latest news of the user',
  })
  isGetLastestNews: boolean;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is notify comment of the user',
  })
  isNotifyComment: boolean;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is notify group of the user',
  })
  isNotifyGroup: boolean;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is notify tag of the user',
  })
  isNotifyTag: boolean;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is notify friend request of the user',
  })
  isNotifyFriendRequest: boolean;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is notify event of the user',
  })
  isNotifyEvent: boolean;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is notify market of the user',
  })
  isNotifyMarket: boolean;

  @ApiProperty({
    type: String,
    example: 'This is a stream description',
    description: 'Stream description of the user',
  })
  streamDescription: string;

  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Avatar ID type by UUID',
  })
  avatarId: string;

  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Banner ID type by UUID',
  })
  bannerId: string;

  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Country ID type by UUID',
  })
  countryId: string;

  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'City ID type by UUID',
  })
  cityId: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Created date of the user',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Updated date of the user',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Deleted date of the user',
  })
  deletedAt: Date;
}
