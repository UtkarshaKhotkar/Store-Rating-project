import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { Rating } from '../entities/rating.entity';
export declare class StoresService {
    private storesRepository;
    private ratingsRepository;
    constructor(storesRepository: Repository<Store>, ratingsRepository: Repository<Rating>);
    create(storeData: any): Promise<Store>;
    findAll(filters?: any): Promise<any[]>;
    findOne(id: string): Promise<Store>;
    count(): Promise<number>;
}
