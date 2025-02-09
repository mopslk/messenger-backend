import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@/auth/auth.controller';

describe('AuthController', () => {
  let resolver: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthController],
    }).compile();

    resolver = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
