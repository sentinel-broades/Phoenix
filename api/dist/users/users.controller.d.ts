import { UsersService } from './users.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { User } from '../entitites/users.entity';
import { ILogger } from '../utils/interfaces/ILogger';
export declare class UsersController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UsersService, logger: ILogger);
    findAll(): Promise<User[]>;
    register(data: RegisterDto): Promise<import("./dto/tokenDto").TokenDto>;
    login(data: LoginDto): Promise<import("./dto/tokenDto").TokenDto>;
}
