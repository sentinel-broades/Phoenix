"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const users_entity_1 = require("../entitites/users.entity");
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository, passwordService, logger, jwtService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.logger = logger;
        this.jwtService = jwtService;
        this.jwtService = jwtService;
        this.logger.setContext(UsersService_1.name);
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async register(data) {
        data.password = await this.passwordService.encrypt(data.password);
        const user = this.userRepository.create(data);
        await this.userRepository.save(user);
        return await this.signToken(user);
    }
    async login(data) {
        const user = await this.userRepository.findOneBy({ email: data.email });
        if (user) {
            const passwordMatches = await this.passwordService.comparePasswords(data.password, user.password);
            if (passwordMatches)
                return this.signToken(user);
        }
        throw new common_1.UnauthorizedException('Invalid Credentials');
    }
    async signToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            image: user.image,
        };
        return { accessToken: await this.jwtService.signAsync(payload) };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, common_1.Inject)('IPasswordService')),
    __param(2, (0, common_1.Inject)('ILogger')),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, Object, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map