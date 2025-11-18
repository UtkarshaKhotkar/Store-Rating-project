import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: any): Promise<User> {
    const existing = await this.usersRepository.findOne({ where: { email: userData.email } });
    if (existing) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      role: userData.role || UserRole.USER,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(filters?: any): Promise<User[]> {
    const where: any = {};
    if (filters?.name) where.name = Like(`%${filters.name}%`);
    if (filters?.email) where.email = Like(`%${filters.email}%`);
    if (filters?.address) where.address = Like(`%${filters.address}%`);
    if (filters?.role) where.role = filters.role;
    return this.usersRepository.find({ where, relations: ['store'] });
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id }, relations: ['store'] });
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { password: hashedPassword });
  }

  async count(): Promise<number> {
    return this.usersRepository.count();
  }
}
