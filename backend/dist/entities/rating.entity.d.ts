import { User } from './user.entity';
import { Store } from './store.entity';
export declare class Rating {
    id: string;
    rating: number;
    user: User;
    store: Store;
    createdAt: Date;
    updatedAt: Date;
}
