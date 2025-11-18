import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';
import { Store } from '../entities/store.entity';

export async function seedDatabase(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const storeRepo = dataSource.getRepository(Store);

  const adminExists = await userRepo.findOne({ where: { email: 'admin@system.com' } });
  if (!adminExists) {
    const admin = userRepo.create({
      name: 'System Administrator Account',
      email: 'admin@system.com',
      password: await bcrypt.hash('Admin@123', 10),
      address: '123 Admin Street, City, Country',
      role: UserRole.ADMIN,
    });
    await userRepo.save(admin);
    console.log('Admin user created');
  }
}
