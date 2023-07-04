import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService], // Inclua o PrismaService nos providers
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const token = 'generated-token';

      jest.spyOn(authService, 'login').mockResolvedValue(token);

      const result = await controller.login({ email, password });

      expect(result).toEqual({ token });
      expect(authService.login).toHaveBeenCalledWith(email, password);
    });
  });

  describe('register', () => {
    it('should return a token', async () => {
      const fullName = 'John Doe';
      const email = 'test@example.com';
      const type = 'user';
      const password = 'password';
      const token = 'generated-token';

      jest.spyOn(authService, 'register').mockResolvedValue(token);

      const result = await controller.register({
        fullName,
        email,
        type,
        password,
      });

      expect(result).toEqual(token);
      expect(authService.register).toHaveBeenCalledWith(
        fullName,
        email,
        password,
        type,
      );
    });
  });
});
