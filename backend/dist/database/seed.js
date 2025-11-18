"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const bcrypt = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
const store_entity_1 = require("../entities/store.entity");
async function seedDatabase(dataSource) {
    const userRepo = dataSource.getRepository(user_entity_1.User);
    const storeRepo = dataSource.getRepository(store_entity_1.Store);
    const adminExists = await userRepo.findOne({ where: { email: 'admin@system.com' } });
    if (!adminExists) {
        const admin = userRepo.create({
            name: 'System Administrator Account',
            email: 'admin@system.com',
            password: await bcrypt.hash('Admin@123', 10),
            address: '123 Admin Street, City, Country',
            role: user_entity_1.UserRole.ADMIN,
        });
        await userRepo.save(admin);
        console.log('Admin user created');
    }
}
//# sourceMappingURL=seed.js.map