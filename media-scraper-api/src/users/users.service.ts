import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async createUser(createUser: CreateUser): Promise<boolean> {
    const result = await this.usersRepository.createUser(createUser);
    const success = !!result.identifiers[0].id;
    return success;
  }

  async getUserById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.getUserById(id);
  }

  async getUserByUsername(username: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getUserByUsername(username);
  }
}
