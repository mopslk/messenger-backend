import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1707516145974 implements MigrationInterface {
  name = 'CreateUsersTable1707516145974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" (
      "id" SERIAL NOT NULL, 
      "login" character varying NOT NULL, 
      "name" character varying NOT NULL, 
      "password" character varying NOT NULL, 
      "bio" character varying, 
      "avatar" character varying, 
      "refresh_token" character varying NOT NULL, 
      CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), 
      CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
