import { redisStore } from 'cache-manager-redis-yet';
import type { CacheStore } from '@nestjs/cache-manager';

export const redisConfig = {
  isGlobal   : true,
  useFactory : async () => {
    const store = await redisStore({
      socket: {
        host : process.env.REDIS_HOST,
        port : Number(process.env.REDIS_PORT ?? 6379),
      },
      username : process.env.REDIS_USER,
      password : process.env.REDIS_PASSWORD,
    });

    return {
      store : store as unknown as CacheStore,
      ttl   : 10 * 60000, // 10 minutes
    };
  },
};
