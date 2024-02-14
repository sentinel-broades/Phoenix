import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './password.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entitites/users.entity';
import { WinstonLogger } from '../utils/winstonLogger';

//TODO - Move Secret!
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'mySecret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'IPasswordService',
      useClass: PasswordService,
    },
    {
      provide: 'ILogger',
      useClass: WinstonLogger,
    },
  ],
})
export class UsersModule {}
