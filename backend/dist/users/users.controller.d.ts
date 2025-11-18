import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(userData: any): Promise<import("../entities/user.entity").User>;
    findAll(filters: any): Promise<import("../entities/user.entity").User[]>;
    count(): Promise<number>;
    findOne(id: string): Promise<import("../entities/user.entity").User>;
    updatePassword(req: any, body: {
        password: string;
    }): Promise<void>;
}
