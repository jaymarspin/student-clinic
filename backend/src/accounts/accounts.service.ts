import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';

 @Injectable()
 export class AccountsService {
  constructor (
    @InjectRepository(AccountEntity)
    private readonly account: Repository<AccountEntity>,
  ){}
  async create(data): Promise<AccountEntity> {
    return this.account.save(data);
  }

  public async getUserByUsername(username: string): Promise<AccountEntity | undefined> {
    return this.account.findOneBy({ username: username})
  }

findALL() {
  return `this action return all accounts`;
}
FindRelationsNotFoundError(id: number) {

}

findOne(id:number) {
  return `this action return a #${id}account`;
}

update(id: number, updateAccountDto: UpdateAccountDto){
  return `this action update a #${id} account`;
}

remove(id:number) {
  return `this action removes a #${id}account`;
}
 }