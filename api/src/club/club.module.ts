import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from '../entitites/clubs.entity';
import { WinstonLogger } from '../utils/winstonLogger';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  controllers: [ClubController],
  providers: [
    ClubService,
    {
      provide: 'ILogger',
      useClass: WinstonLogger,
    },
  ],
})
export class ClubModule {}
