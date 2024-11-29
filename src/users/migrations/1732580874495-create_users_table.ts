import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1732580874495 implements MigrationInterface {
    name = 'CreateUsersTable1732580874495';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"');
      await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"');
      await queryRunner.query('ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
      await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"');
      await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"');
      await queryRunner.query('ALTER TABLE "users" ADD "id" SERIAL NOT NULL');
      await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")');
    }
}
