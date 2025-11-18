import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn, Unique } from 'typeorm';
import { User } from './user.entity';
import { Store } from './store.entity';

@Entity('ratings')
@Unique(['user', 'store'])
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', width: 1 })
  rating: number;

  @ManyToOne(() => User, user => user.ratings)
  user: User;

  @ManyToOne(() => Store, store => store.ratings)
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
