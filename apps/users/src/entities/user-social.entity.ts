import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_socials')
export class UserSocialEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  facebookUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twitterUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instagramUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twitchUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  googleUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  youtubeUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patreonUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  discordChannel: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviantArtUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  behanceUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dribbleUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  artStationUserName: string;

  @Column({ type: 'bool', default: false })
  isEnableTwitterFeed: boolean;

  @Column({ type: 'bool', default: false })
  isEnableTwitchStream: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  facebookId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  googleId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twitterId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twitchId: string;

  @OneToOne(() => UserEntity, (user) => user.userSocial)
  @JoinColumn()
  user: UserEntity;
}
