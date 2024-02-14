import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ClubModule } from './club/club.module';
import { WinstonLogger } from './utils/winstonLogger';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'phoenix',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'mySecret',
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    ClubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
