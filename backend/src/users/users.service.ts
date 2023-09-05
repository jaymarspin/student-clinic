import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
  ) {}


  async create(data): Promise<UserEntity> {
    return this.user.save(data);
  }

  findAll() {
    return this.user.find();
  }

  findOne(id: string): Promise<UserEntity> {
    return null
  }

  public async getUserByEmail(email: string): Promise<UserEntity | undefined>{
    return  null
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
