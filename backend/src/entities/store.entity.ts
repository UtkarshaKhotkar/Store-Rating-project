import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Rating } from './rating.entity';
import { User } from './user.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column()
  email: string;

  @Column({ length: 400 })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Rating, rating => rating.store)
  ratings: Rating[];

  @OneToOne(() => User, user => user.store, { nullable: true })
  @JoinColumn()
  owner: User;
}
