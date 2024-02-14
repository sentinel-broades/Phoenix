import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from './clubs.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 250 })
  name: string;

  @Column({ nullable: true, length: 256 })
  image: string;

  @Column({ nullable: false })
  dateOfBirth: Date;

  @Column({ nullable: false, length: 256, unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: true, length: 256 })
  password: string;

  @OneToMany(() => Club, (club) => club.owner)
  clubs: Club[];
}
