-- AlterTable
ALTER TABLE "users" ADD COLUMN     "secret" VARCHAR,
ALTER COLUMN "id" SET DEFAULT nextval('uqid'::regclass),
ALTER COLUMN "id" DROP DEFAULT;
