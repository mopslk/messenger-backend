CREATE SEQUENCE uqid
    START WITH 1000000000
    INCREMENT BY 1
    OWNED BY NONE;

-- CreateTable
CREATE TABLE "users" (
    "id" BIGINT NOT NULL DEFAULT nextval('uqid'::regclass),
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
