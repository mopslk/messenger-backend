CREATE SEQUENCE global_bigint_seq
    START WITH 1000000000
    INCREMENT BY 1;

-- CreateTable
CREATE TABLE "users" (
    "id" BIGINT NOT NULL DEFAULT nextval('global_bigint_seq'),
    "login" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "bio" VARCHAR,
    "avatar" VARCHAR,
    "refresh_token" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_2d443082eccd5198f95f2a36e2c" ON "users"("login");
