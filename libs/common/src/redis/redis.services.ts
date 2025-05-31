import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../constants';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  /**
   * Sets a key in Redis with an optional TTL (time to live).
   * @param key The key to set.
   * @param value The value to set for the key.
   * @param ttlSeconds Optional time to live in seconds. If provided, the key will expire after this duration.
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.redisClient.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  /**
   * Retrieves the value of a key from Redis.
   * @param key The key to retrieve.
   * @returns The value associated with the key, or null if the key does not exist.
   */
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  /**
   * Deletes a key from Redis.
   * @param key The key to delete.
   * @returns The number of keys that were removed.
   */
  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  /**
   * Sets a key in Redis with an expiration time.
   * @param key The key to set.
   * @param ttlSeconds The time to live in seconds.
   * @returns The number of keys that were set to expire.
   */
  async expire(key: string, ttlSeconds: number): Promise<number> {
    return await this.redisClient.expire(key, ttlSeconds);
  }

  /**
   * Gets the time to live (TTL) of a key in Redis.
   * @param key The key to check.
   * @returns The TTL in seconds, or -1 if the key does not have an expiration time.
   */
  async ttl(key: string): Promise<number> {
    return await this.redisClient.ttl(key);
  }

  /**
   * Increments the integer value of a key in Redis.
   * @param key The key to increment.
   * @returns The new value of the key after incrementing.
   */
  async incr(key: string): Promise<number> {
    return await this.redisClient.incr(key);
  }

  /**
   * Decrements the integer value of a key in Redis.
   * @param key The key to decrement.
   * @returns The new value of the key after decrementing.
   */
  async decr(key: string): Promise<number> {
    return await this.redisClient.decr(key);
  }

  /**
   * Publishes a message to a Redis channel.
   * @param channel The channel to publish to.
   * @param message The message to publish.
   * @returns The number of subscribers that received the message.
   */
  async publish(channel: string, message: string): Promise<number> {
    return await this.redisClient.publish(channel, message);
  }

  /**
   * Sets a key in Redis only if it does not already exist (NX).
   * @param key The key to set.
   * @param value The value to set for the key.
   * @param ttlSeconds Optional time to live in seconds. If provided, the key will expire after this duration.
   * @returns True if the key was set, false if it already exists.
   */
  async setNx(
    key: string,
    value: string,
    ttlSeconds: number,
  ): Promise<boolean> {
    const result = await this.redisClient.set(
      key,
      value,
      'EX',
      ttlSeconds,
      'NX',
    );
    return result === 'OK';
  }
}
