import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private account: UsersService) { }

  async signinLocal(dto: AuthDto) {
    let response;
    await this.validate(dto).then(res => {
      response = res
    });
    return await response

  }
 
  async validate(dto: AuthDto) {
    
    let user;
    let token;
    await this.account.getUserByUsername(dto.username).then(data => {
      user = data
    })
    if (!user) {
      return new Promise((resolve, reject) => {
        resolve({ message: "Username or Password invalid" })
      })
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(dto.password, user.password, (err, res) => {
        if (res === true) {
          token = {
            token: this.signUser(user.id, user.username, 'user'),
            id: user.id,
            user: user
          }
          resolve(token)

        } else {
          resolve({ message: 'Username or Password invalid' })
        }
      })
    })

  }

  signUser(userId: number, username: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      username,
      type: type,
    });
  }
}
