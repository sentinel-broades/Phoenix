import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { IAddressable } from './IAddressable';

@Entity()
export class Club implements IAddressable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ownerId: number;

  @Column({ nullable: false, length: 250, unique: true })
  name: string;

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column({ nullable: true, length: 256 })
  image: string;

  @Column({ nullable: true, length: 250 })
  address1: string;

  @Column({ nullable: true, length: 250 })
  address2: string;

  @Column({ nullable: true, length: 100 })
  state: string;

  @Column({ nullable: true, length: 100 })
  city: string;

  @Column({ nullable: true, length: 15 })
  postcode: string;

  @Column({ nullable: true, length: 50 })
  country: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
