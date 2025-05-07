import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { MARITIAL_ENUM } from '../enums';
import { UserPermissionEntity } from './user-permission.entity';
import { UserSocialEntity } from './user-social.entity';
import { SecurityInfoEntity } from './security-info.entity';
import { InterestEntity } from './interest.entity';
import { JobAndEducationEntity } from './job-and-education.entity';
import { UserBadgeEntity } from './user-badge.entity';
import { ChannelFAQEntity } from './channel-faq.entity';
import { StreamScheduleEntity } from './stream-schedule.entity';
import { UserPaymentMethodEntity } from './user-payment-method.entity';
import { AuthTokenEntity } from './auth-token.entity';

@Entity('users')
export class UserEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 10, default: 'en' })
  language?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 255 })
  hashedPassword: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tagLine?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicEmail?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicWebsite?: string;

  @Column({ type: 'timestamp', nullable: true })
  birthDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  major?: string;

  @Column({
    type: 'enum',
    enum: MARITIAL_ENUM,
    default: MARITIAL_ENUM.SINGLE,
    enumName: 'maritial_status',
  })
  martialStatus?: MARITIAL_ENUM;

  @Column({ type: 'varchar', length: 255, nullable: true })
  birthPlace?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  psId?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  xbId?: string;

  @Column({ type: 'int', default: 1 })
  level?: number;

  @Column({ type: 'int', default: 0 })
  exp?: number;

  @Column({ type: 'int', default: 0 })
  followerCount?: number;

  @Column({ type: 'int', default: 0 })
  followingCount?: number;

  @Column({ type: 'int', default: 0 })
  postCount?: number;

  @Column({ type: 'int', default: 0 })
  commentCount?: number;

  @Column({ type: 'int', default: 0 })
  visitCount?: number;

  @Column({ type: 'int', default: 0 })
  reactCount?: number;

  @Column({ type: 'int', default: 0 })
  shareCount?: number;

  @Column({ type: 'boolean', default: false })
  isGetLastestNews: boolean;

  @Column({ type: 'boolean', default: false })
  isNotifyComment: boolean;

  @Column({ type: 'boolean', default: false })
  isGetNewByMail?: boolean;

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

  @Column({ type: 'boolean', default: false })
  isVerify?: boolean;

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
    cascade: true,
    eager: true,
  })
  userSocial: UserSocialEntity;

  @OneToOne(() => SecurityInfoEntity, (securityInfo) => securityInfo.user, {
    cascade: true,
    eager: true,
  })
  securityInfo: SecurityInfoEntity;

  @OneToMany(() => InterestEntity, (interest) => interest.user, {
    cascade: true,
    eager: true,
  })
  interests: InterestEntity[];

  @OneToMany(
    () => JobAndEducationEntity,
    (jobAndEducation) => jobAndEducation.user,
    {
      cascade: true,
      eager: true,
    },
  )
  jobAndEducations: JobAndEducationEntity[];

  @OneToMany(() => UserBadgeEntity, (userBadge) => userBadge.user, {
    cascade: true,
    eager: true,
  })
  userBadges: UserBadgeEntity[];

  @OneToMany(() => ChannelFAQEntity, (channelFaq) => channelFaq.user, {
    cascade: true,
    eager: true,
  })
  channelFaq: ChannelFAQEntity[];

  @OneToMany(
    () => StreamScheduleEntity,
    (streamSchedule) => streamSchedule.user,
    {
      cascade: true,
      eager: true,
    },
  )
  streamSchedules: StreamScheduleEntity[];

  @OneToMany(
    () => UserPaymentMethodEntity,
    (paymentMethod) => paymentMethod.user,
  )
  paymentMethods: UserPaymentMethodEntity[];

  @OneToMany(() => AuthTokenEntity, (authToken) => authToken.user, {
    cascade: true,
    eager: true,
  })
  authTokens?: AuthTokenEntity[];
}
