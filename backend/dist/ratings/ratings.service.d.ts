import { Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { Store } from '../entities/store.entity';
import { User } from '../entities/user.entity';
export declare class RatingsService {
    private ratingsRepository;
    private storesRepository;
    private usersRepository;
    constructor(ratingsRepository: Repository<Rating>, storesRepository: Repository<Store>, usersRepository: Repository<User>);
    submitRating(userId: string, storeId: string, ratingValue: number): Promise<Rating>;
    getUserRating(userId: string, storeId: string): Promise<Rating | null>;
    getStoreRatings(storeId: string): Promise<Rating[]>;
    count(): Promise<number>;
}
