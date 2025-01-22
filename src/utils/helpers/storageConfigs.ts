import { redisStore } from 'cache-manager-redis-yet';
import { diskStorage } from 'multer';
import type { CacheStore } from '@nestjs/cache-manager';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import type { CacheModuleAsyncOptions } from '@nestjs/common/cache';
import { editFileName, fileFilter, getDestinationFolder } from '@/utils/helpers/file';

export const redisConfig: CacheModuleAsyncOptions<{ store: CacheStore, ttl: number }> = {
  isGlobal   : true,
  useFactory : async () => {
    const store = await redisStore({
      socket: {
        host : process.env.REDIS_HOST,
        port : Number(process.env.REDIS_PORT ?? 6379),
      },
    });

    return {
      store : store as CacheStore,
      ttl   : 10 * 60000, // 10 minutes
    };
  },
};

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: async (_req, _file, callback) => {
      const folder = await getDestinationFolder();
      callback(null, folder);
    },
    filename: editFileName,
  }),
  fileFilter,
};
