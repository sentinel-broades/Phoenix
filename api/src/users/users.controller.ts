import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { User } from '../entitites/users.entity';
import { ILogger } from '../utils/interfaces/ILogger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @Inject('ILogger')
    private readonly logger: ILogger,
  ) {
    this.logger.setContext(UsersController.name);
  }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      this.logger.httpError('There was a problem retrieving the users', error);
    }
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() data: RegisterDto) {
    try {
      return await this.userService.register(data);
    } catch (error) {
      this.logger.createEntityError(error, 'User');
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    try {
      return await this.userService.login(data);
    } catch (error) {
      this.logger.httpError('There was an error logging the user in', error);
    }
  }
}
