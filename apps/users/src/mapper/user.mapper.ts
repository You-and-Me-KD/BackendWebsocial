import { UserDomain } from '../domain';
import { UserEntity } from '../entities';
import { AuthTokenMapper } from './auth-token.mapper';

export class UserMapper {
  static toDomain(raw: UserEntity): UserDomain {
    const user = new UserDomain();
    user.id = raw.id;
    user.firstName = raw.firstName;
    user.lastName = raw.lastName;
    user.username = raw.username;
    user.email = raw.email;
    user.phoneNumber = raw.phoneNumber;
    user.language = raw.language;
    user.address = raw.address;
    user.description = raw.description;
    user.tagLine = raw.tagLine;
    user.hashedPassword = raw.hashedPassword;
    user.publicEmail = raw.publicEmail;
    user.publicWebsite = raw.publicWebsite;
    user.birthDate = raw.birthDate;
    user.major = raw.major;
    user.martialStatus = raw.martialStatus;
    user.birthPlace = raw.birthPlace;
    user.psId = raw.psId;
    user.xbId = raw.xbId;
    user.level = raw.level;
    user.exp = raw.exp;
    user.followerCount = raw.followerCount;
    user.followingCount = raw.followingCount;
    user.postCount = raw.postCount;
    user.commentCount = raw.commentCount;
    user.visitCount = raw.visitCount;
    user.reactCount = raw.reactCount;
    user.isVerify = raw.isVerify;
    user.isGetNewByMail = raw.isGetNewByMail;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    // user.authTokens = raw.authTokens;
    return user;
  }

  static toPersistence(domain: UserDomain): UserEntity {
    const user = new UserEntity();
    user.id = domain.id;
    user.firstName = domain.firstName;
    user.lastName = domain.lastName;
    user.username = domain.username;
    user.email = domain.email;
    user.phoneNumber = domain.phoneNumber;
    user.language = domain.language;
    user.address = domain.address;
    if (domain.hashedPassword) {
      user.hashedPassword = domain.hashedPassword;
    }
    user.description = domain.description;
    user.tagLine = domain.tagLine;
    user.publicEmail = domain.publicEmail;
    user.publicWebsite = domain.publicWebsite;
    user.birthDate = domain.birthDate;
    user.major = domain.major;
    user.martialStatus = domain.martialStatus;
    user.birthPlace = domain.birthPlace;
    user.psId = domain.psId;
    user.xbId = domain.xbId;
    user.level = domain.level;
    user.exp = domain.exp;
    user.followerCount = domain.followerCount;
    user.followingCount = domain.followingCount;
    user.postCount = domain.postCount;
    user.commentCount = domain.commentCount;
    user.visitCount = domain.visitCount;
    user.reactCount = domain.reactCount;
    user.isVerify = domain.isVerify;
    user.isGetNewByMail = domain.isGetNewByMail;
    if (domain.createdAt) {
      user.createdAt = domain.createdAt;
    }

    if (domain.updatedAt) {
      user.updatedAt = domain.updatedAt;
    }
    if (domain.deletedAt) {
      user.deletedAt = domain.deletedAt;
    }

    if (domain.authTokens) {
      user.authTokens = domain.authTokens.map((token) =>
        AuthTokenMapper.toPersistence(token),
      );
    }

    return user;
  }
}
