import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';
import { UserEntity } from './entities/user.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body('fullname') fullname: string,
    @Body('username') username: string,
    @Body('role') role: string,
    @Body('bdate') bdate: string,
    @Body('password') password: string,
  ) {
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.usersService.create({
      fullname,
      username,
      bdate,
      password: hash,
      role,
    });
  }
  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: UserEntity) {
    const saltOrRounds = 10;

    user.password = await bcrypt.hash(user.password, saltOrRounds);
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
