import { StoresService } from './stores.service';
export declare class StoresController {
    private storesService;
    constructor(storesService: StoresService);
    create(storeData: any): Promise<import("../entities/store.entity").Store>;
    findAll(filters: any): Promise<any[]>;
    count(): Promise<number>;
    findOne(id: string): Promise<import("../entities/store.entity").Store>;
}
