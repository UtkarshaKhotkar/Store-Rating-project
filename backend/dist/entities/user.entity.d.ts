import { Rating } from './rating.entity';
import { Store } from './store.entity';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    STORE_OWNER = "store_owner"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    role: UserRole;
    createdAt: Date;
    ratings: Rating[];
    store: Store;
}
