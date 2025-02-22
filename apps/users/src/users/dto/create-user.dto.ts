import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { MARITIAL_ENUM } from '../enums';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  userName: string;
  @IsEmail()
  email: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  language: string;
  @IsString()
  address: string;
  @IsString()
  hashedPassword: string;
  @IsString()
  description: string;
  @IsString()
  tagLine: string;
  @IsString()
  publicEmail: string;
  @IsString()
  publicWebsite: string;
  birthDate: Date;
  @IsString()
  major: string;
  @IsEnum(MARITIAL_ENUM)
  martialStatus: MARITIAL_ENUM;
  @IsString()
  birthPlace: string;
  @IsString()
  psId: string;
  @IsString()
  xbId: string;
  @IsNumber()
  level: number;
  @IsNumber()
  exp: number;
  @IsNumber()
  followerCount: number;
  @IsNumber()
  followingCount: number;
  @IsNumber()
  postCount: number;
  @IsNumber()
  commentCount: number;
  @IsNumber()
  visitCount: number;
  @IsNumber()
  reactCount: number;
  @IsNumber()
  shareCount: number;
  @IsBoolean()
  isGetLastestNews: boolean;
  @IsBoolean()
  isNotifyComment: boolean;
  @IsBoolean()
  isNotifyGroup: boolean;
  @IsBoolean()
  isNotifyTag: boolean;
  @IsBoolean()
  isNotifyFriendRequest: boolean;
  @IsBoolean()
  isNotifyEvent: boolean;
  @IsBoolean()
  isNotifyMarket: boolean;
  @IsString()
  streamDescription: string;

  /*
        - NEED UPDATE
        - Related with table: avatars
      */
  @IsString()
  avatarId: string;
  /*
              - NEED UPDATE
              - Related with table: avatars
          */
  @IsString()
  bannerId: string;

  /*
          - NEED UPDATE
          - Related with table: countries
        */
  @IsString()
  countryId: string;
  /*
            - NEED UPDATE
            - Related with table: cities
          */
  @IsString()
  cityId: string;
}
