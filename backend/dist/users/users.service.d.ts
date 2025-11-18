import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: any): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findAll(filters?: any): Promise<User[]>;
    findOne(id: string): Promise<User>;
    updatePassword(userId: string, newPassword: string): Promise<void>;
    count(): Promise<number>;
}
