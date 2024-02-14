import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { RegisterDto } from './dto/registerDto';
import { UsersService } from './users.service';
import { createMock } from '@golevelup/ts-jest';
import { HttpStatus } from '@nestjs/common';

const validRegisterDto: RegisterDto = {
  name: 'John Doe',
  dateOfBirth: new Date('1990-01-01'),
  email: 'johndoe@example.com',
  password: 'Password123$',
};

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const usersServiceMock = {
      register: jest.fn().mockResolvedValue('token'),
      findAll: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should return HTTP status 201 after successful registration', async () => {
    const res = createMock<any>();
    res.status.mockReturnValue(res);
    const result = await usersController.register(validRegisterDto, res);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
  });
});
