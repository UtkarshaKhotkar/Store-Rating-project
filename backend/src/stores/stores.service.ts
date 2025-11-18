import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Store } from '../entities/store.entity';
import { Rating } from '../entities/rating.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  async create(storeData: any): Promise<Store> {
    const store = this.storesRepository.create(storeData);
    return this.storesRepository.save(store);
  }

  async findAll(filters?: any): Promise<any[]> {
    const where: any = {};
    if (filters?.name) where.name = Like(`%${filters.name}%`);
    if (filters?.address) where.address = Like(`%${filters.address}%`);
    
    const stores = await this.storesRepository.find({ where, relations: ['ratings'] });
    
    return Promise.all(stores.map(async (store) => {
      const avgRating = await this.ratingsRepository
        .createQueryBuilder('rating')
        .select('AVG(rating.rating)', 'avg')
        .where('rating.storeId = :storeId', { storeId: store.id })
        .getRawOne();
      
      return {
        ...store,
        averageRating: avgRating?.avg ? parseFloat(avgRating.avg).toFixed(1) : 0,
      };
    }));
  }

  async findOne(id: string): Promise<Store> {
    return this.storesRepository.findOne({ where: { id }, relations: ['ratings', 'ratings.user'] });
  }

  async count(): Promise<number> {
    return this.storesRepository.count();
  }
}
