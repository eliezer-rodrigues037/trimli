import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { isDefined } from 'src/utils/isDefined';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save({
      ...createUserDto,
    });

    return user;
  }

  async update({
    id,
    updateUserDto,
  }: {
    id: string;
    updateUserDto: UpdateUserDto;
  }) {
    const userExists = await this.userRepository.findOneBy({ id });

    if (!isDefined(userExists)) throw new NotFoundException('User not found');

    const updatedUser = await this.userRepository.save({
      ...userExists,
      ...updateUserDto,
    });

    return updatedUser;
  }
}
