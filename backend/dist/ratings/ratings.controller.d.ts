import { RatingsService } from './ratings.service';
export declare class RatingsController {
    private ratingsService;
    constructor(ratingsService: RatingsService);
    submitRating(req: any, body: {
        storeId: string;
        rating: number;
    }): Promise<import("../entities/rating.entity").Rating>;
    getStoreRatings(storeId: string): Promise<import("../entities/rating.entity").Rating[]>;
    getUserRating(req: any, storeId: string): Promise<import("../entities/rating.entity").Rating>;
    count(): Promise<number>;
}
