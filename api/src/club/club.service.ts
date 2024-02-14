import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from '../entitites/clubs.entity';
import { Repository } from 'typeorm';
import { ILogger } from '../utils/interfaces/ILogger';
import { CreateClubDto } from './dto/createClubDto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club) private clubRepository: Repository<Club>,
    @Inject('ILogger') private readonly logger: ILogger,
  ) {
    this.logger.setContext(ClubService.name);
  }

  async find() {}

  async create(data: CreateClubDto, ownerId: number): Promise<Club> {
    const club = this.clubRepository.create({
      ownerId,
      name: data.name,
      description: data.description,
      image: data.description,
      address1: data.address1,
      address2: data.address2,
      state: data.state,
      city: data.city,
      postcode: data.postcode,
      country: data.country,
    });
    await this.clubRepository.save(club);
    return club;
  }
}
