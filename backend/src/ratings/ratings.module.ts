import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from '../entities/rating.entity';
import { Store } from '../entities/store.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Store, User])],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
