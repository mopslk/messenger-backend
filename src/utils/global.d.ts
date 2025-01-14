declare global {
  namespace PrismaJson {
    type UserInfoType = { ip: string; userAgent: string };
  }
}

export {};
