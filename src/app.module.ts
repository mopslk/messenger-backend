import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { dataSourceOptions } from './utils/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from '@/auth/utils/auth.guard';
import { UniqueConstraint } from '@/utils/decorators/unique.decorator';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
  ],
  controllers : [],
  providers   : [
    {
      provide  : APP_GUARD,
      useClass : AuthGuard,
    },
    UniqueConstraint,
  ],
})
export class AppModule {}
