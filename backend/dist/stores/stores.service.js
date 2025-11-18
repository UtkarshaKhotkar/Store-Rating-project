"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("../entities/store.entity");
const rating_entity_1 = require("../entities/rating.entity");
let StoresService = class StoresService {
    constructor(storesRepository, ratingsRepository) {
        this.storesRepository = storesRepository;
        this.ratingsRepository = ratingsRepository;
    }
    async create(storeData) {
        const store = this.storesRepository.create(storeData);
        return this.storesRepository.save(store);
    }
    async findAll(filters) {
        const where = {};
        if (filters?.name)
            where.name = (0, typeorm_2.Like)(`%${filters.name}%`);
        if (filters?.address)
            where.address = (0, typeorm_2.Like)(`%${filters.address}%`);
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
    async findOne(id) {
        return this.storesRepository.findOne({ where: { id }, relations: ['ratings', 'ratings.user'] });
    }
    async count() {
        return this.storesRepository.count();
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(1, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StoresService);
//# sourceMappingURL=stores.service.js.map