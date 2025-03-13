import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { MARITIAL_ENUM } from '../enums';
import { UserPermissionEntity } from './user-permission.entity';
import { UserSocialEntity } from './user-social.entity';
import { SecurityInfoEntity } from './security-info.entity';
import { InterestEntity } from './interest.entity';

@Entity('users')
export class UserEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  firstName: string;
  @Column({ type: 'varchar', length: 255 })
  lastName: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  userName: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;
  @Column({ type: 'varchar', length: 10, default: 'en' })
  language: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;
  @Column({ type: 'varchar', length: 255 })
  hashedPassword: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  tagLine: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  publicEmail: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  publicWebsite: string;
  @Column({ type: 'timestamp', nullable: true })
  birthDate: Date;
  @Column({ type: 'varchar', length: 255, nullable: true })
  major: string;
  @Column({
    type: 'enum',
    enum: MARITIAL_ENUM,
    default: MARITIAL_ENUM.SINGLE,
  })
  martialStatus: MARITIAL_ENUM;
  @Column({ type: 'varchar', length: 255, nullable: true })
  birthPlace: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  psId: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  xbId: string;
  @Column({ type: 'int', default: 1 })
  level: number;
  @Column({ type: 'int', default: 0 })
  exp: number;
  @Column({ type: 'int', default: 0 })
  followerCount: number;
  @Column({ type: 'int', default: 0 })
  followingCount: number;
  @Column({ type: 'int', default: 0 })
  postCount: number;
  @Column({ type: 'int', default: 0 })
  commentCount: number;
  @Column({ type: 'int', default: 0 })
  visitCount: number;
  @Column({ type: 'int', default: 0 })
  reactCount: number;
  @Column({ type: 'int', default: 0 })
  shareCount: number;
  @Column({ type: 'boolean', default: false })
  isGetLastestNews: boolean;
  @Column({ type: 'boolean', default: false })
  isNotifyComment: boolean;
  @Column({ type: 'boolean', default: false })
  isNotifyGroup: boolean;
  @Column({ type: 'boolean', default: false })
  isNotifyTag: boolean;
  @Column({ type: 'boolean', default: false })
  isNotifyFriendRequest: boolean;
  @Column({ type: 'boolean', default: false })
  isNotifyEvent: boolean;
  @Column({ type: 'boolean', default: false })
  isNotifyMarket: boolean;
  @Column({ type: 'text', nullable: true })
  streamDescription: string;
  @Column({ type: 'varchar', nullable: true })
  avatarId: string;
  @Column({ type: 'varchar', nullable: true })
  bannerId: string;
  @Column({ type: 'varchar', nullable: true })
  countryId: string;

  @Column({ type: 'varchar', nullable: true })
  cityId: string;

  @OneToOne(
    () => UserPermissionEntity,
    (userPermission) => userPermission.user,
    {
      // auto create userPermission when create user
      cascade: true,
      // eager load userPermission when get user
      eager: true,
    },
  )
  userPermission: UserPermissionEntity;

  @OneToOne(() => UserSocialEntity, (userSocial) => userSocial.user, {
    // auto create userSocials when create user
    cascade: true,
    // eager load userSocials when get user
    eager: true,
  })
  userSocial: UserSocialEntity;

  @OneToOne(() => SecurityInfoEntity, (securityInfo) => securityInfo.user, {
    // auto create userSocials when create user
    cascade: true,
    // eager load userSocials when get user
    eager: true,
  })
  securityInfo: SecurityInfoEntity;

  @OneToMany(() => InterestEntity, (interest) => interest.user, {
    // auto create userSocials when create user
    cascade: true,
    // eager load userSocials when get user
    eager: true,
  })
  interests: InterestEntity[];
}
