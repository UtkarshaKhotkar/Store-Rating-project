import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { Store } from '../entities/store.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async submitRating(userId: string, storeId: string, ratingValue: number): Promise<Rating> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const store = await this.storesRepository.findOne({ where: { id: storeId } });

    let rating = await this.ratingsRepository.findOne({
      where: { user: { id: userId }, store: { id: storeId } },
    });

    if (rating) {
      rating.rating = ratingValue;
    } else {
      rating = this.ratingsRepository.create({ user, store, rating: ratingValue });
    }

    return this.ratingsRepository.save(rating);
  }

  async getUserRating(userId: string, storeId: string): Promise<Rating | null> {
    return this.ratingsRepository.findOne({
      where: { user: { id: userId }, store: { id: storeId } },
    });
  }

  async getStoreRatings(storeId: string): Promise<Rating[]> {
    return this.ratingsRepository.find({
      where: { store: { id: storeId } },
      relations: ['user'],
    });
  }

  async count(): Promise<number> {
    return this.ratingsRepository.count();
  }
}
