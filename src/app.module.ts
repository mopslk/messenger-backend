import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@/utils/data-source';

@Module({
  imports     : [TypeOrmModule.forRoot(dataSourceOptions)],
  controllers : [],
  providers   : [],
})
export class AppModule {}
