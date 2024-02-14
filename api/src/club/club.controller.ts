import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClubService } from './club.service';
import { ILogger } from '../utils/interfaces/ILogger';
import { CreateClubDto } from './dto/createClubDto';

@Controller('club')
export class ClubController {
  constructor(
    private readonly clubService: ClubService,
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  //Create
  @Post()
  async create(@Body() data: CreateClubDto) {
    try {
      //TODO get OwnerId from JWT
      return await this.clubService.create(data, 0);
    } catch (error) {
      this.logger.createEntityError(error, 'Club');
    }
  }

  //List
  //Update
  //GetDetails
  //RequestJoin
  //ActionJoin
}
