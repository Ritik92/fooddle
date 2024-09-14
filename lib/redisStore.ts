// lib/tempUserStore.ts
import { Redis } from '@upstash/redis'

interface TempUser {
  username: string;
  password: string;
}

class TempUsersStore {
  private static instance: TempUsersStore;
  private redis: Redis;

  private constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }

  public static getInstance(): TempUsersStore {
    if (!TempUsersStore.instance) {
      TempUsersStore.instance = new TempUsersStore();
    }
    return TempUsersStore.instance;
  }

  public async set(token: string, user: TempUser, expiryInSeconds: number = 3600): Promise<void> {
    await this.redis.set(token, user, { ex: expiryInSeconds });
  }

  public async get(token: string): Promise<TempUser | null> {
    const data = await this.redis.get<TempUser>(token);
    return data || null;
  }

  public async delete(token: string): Promise<boolean> {
    const result = await this.redis.del(token);
    return result === 1;
  }

  public async has(token: string): Promise<boolean> {
    return await this.redis.exists(token) === 1;
  }
}

export default TempUsersStore.getInstance();