import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';
import * as bcrypt from 'bcrypt';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body('fname') firstName: string,
    @Body('lname') lastName: string,
    @Body('email') email: string,
    @Body('bdate') bdate: string,
    
    @Body('password') password: string,
  ) {
    const user = this.usersService.getUserByEmail(email);
    console.log(user);
    const saltOrRounds = 10;
    
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.usersService.create({
      firstName,
      lastName,
      email,
      password: hash,
      bdate,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
