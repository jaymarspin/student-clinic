import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import * as bcrypt from 'bcrypt';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post ()
  async create (
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('fisrtname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('extra') extra: any
  ){
    const salOrRounds = 10;
   

    const hash =await bcrypt.hash(password,salOrRounds);
    return this.accountsService.create({
      username,password: hash,firstname,lastname,extra: extra
    });
  }
  @Get ()
  findALL() {
    return this.accountsService.findALL();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}