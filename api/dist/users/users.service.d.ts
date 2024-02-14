import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerDto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto';
import { TokenDto } from './dto/tokenDto';
import { User } from '../entitites/users.entity';
import { ILogger } from '../utils/interfaces/ILogger';
import { IPasswordService } from './interfaces/IPasswordService';
export declare class UsersService {
    private userRepository;
    private readonly passwordService;
    private readonly logger;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, passwordService: IPasswordService, logger: ILogger, jwtService: JwtService);
    findAll(): Promise<User[]>;
    register(data: RegisterDto): Promise<TokenDto>;
    login(data: LoginDto): Promise<TokenDto>;
    signToken(user: User): Promise<TokenDto>;
}
