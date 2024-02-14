import { UsersService } from './users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entitites/users.entity';

const userRepository: any = {
  find: jest.fn(),
};

const users: User[] = [];

beforeAll(() => {
  userRepository.find.mockImplementation(() => Promise.resolve(users));
});

describe('UsersService', () => {
  let service: UsersService;
  let pwd: PasswordService;
  let jwt: JwtService;
  beforeEach(() => {
    pwd = new PasswordService();
    jwt = new JwtService();
    service = new UsersService(userRepository, pwd, jwt);
  });
  it('should return all users', async () => {
    await expect(service.findAll()).resolves.toEqual(users);
    expect(userRepository.find).toBeCalledTimes(1);
  });
  it('should register a new user', async () => {});
});
