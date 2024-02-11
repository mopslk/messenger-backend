import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@/auth/controllers/auth.controller';

describe('AuthResolver', () => {
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
