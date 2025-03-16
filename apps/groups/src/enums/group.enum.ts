export enum GROUP_TYPE {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum GROUP_MEMBER_ROLE {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
  GUEST = 'guest',
  OWNER = 'owner',
}

export enum GROUP_MEMBER_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  BLOCKED = 'blocked',
}

export enum GROUP_INVITATION_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  BLOCKED = 'blocked',
}
