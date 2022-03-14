import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { v4 as uuidv4 } from 'uuid';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string) {
    return this.usersRepository.findOne({ userId });
  }
  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }
  async createUser(email: string, age: number): Promise<User> {
    return this.usersRepository.create({
      userId: uuidv4(),
      email,
      age,
      favoriteFoods: [],
    });
  }
  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }
}
