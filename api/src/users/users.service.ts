import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerDto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto';
import { TokenDto } from './dto/tokenDto';
import { User } from '../entitites/users.entity';
import { ILogger } from '../utils/interfaces/ILogger';
import { IPasswordService } from './interfaces/IPasswordService';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
    @Inject('ILogger')
    private readonly logger: ILogger,
    private readonly jwtService: JwtService,
  ) {
    this.jwtService = jwtService;

    this.logger.setContext(UsersService.name);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async register(data: RegisterDto): Promise<TokenDto> {
    data.password = await this.passwordService.encrypt(data.password);
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return await this.signToken(user);
  }

  async login(data: LoginDto): Promise<TokenDto> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (user) {
      const passwordMatches = await this.passwordService.comparePasswords(
        data.password,
        user.password,
      );

      if (passwordMatches) return this.signToken(user);
    }

    throw new UnauthorizedException('Invalid Credentials');
  }

  async signToken(user: User): Promise<TokenDto> {
    const payload = {
      userId: user.id,
      email: user.email,
      image: user.image,
    };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
