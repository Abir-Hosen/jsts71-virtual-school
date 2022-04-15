import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './user.model';
import { UserDto } from './user.dto';

@Injectable()
export class UserService implements OnModuleInit {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async sign_up(user: UserDto): Promise<User> {
    user.password = await this.encriptPassword(user.password)
    return await this.usersRepository.save(user)
  }

  async get_all() {
    return await this.usersRepository.find()
  }

  async sign_in(user: UserDto):Promise<any> {
    const userExists = await User.findOne({
      user_name: user.user_name
    })
    if (userExists === undefined) return { msg: 'user not found' }
    const isMatch = await bcrypt.compare(user.password, userExists.password);
    if (isMatch) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime() + 100 * 60000;

      var user_data = {
        id: userExists.id,
        name: userExists.user_name,
        email: userExists.email,
        role: userExists.role,
        validate_time: timestamp
      }
      return { 'Bearer': Buffer.from(JSON.stringify(user_data)).toString('base64'), user_data }
    }
    return isMatch
  }

  async update_profile(userDto: UserDto) {
    return await this.usersRepository.save(userDto)

  }

  async update_password(user:UserDto) {
    
    const userExists = await User.findOne({
      id: user.id
    })
    if (userExists === undefined) return { msg: 'user not found' }
    const isMatch = await bcrypt.compare(user.password, userExists.password);
    if (isMatch) {
      console.log("userExists")
      userExists.password = await this.encriptPassword(user.new_password)
      console.log(userExists)
      return await this.usersRepository.save(userExists)
    }
    else{
      return {errorMsg: "password doesn't match"}
    }

  }
  

  async check_token(user:UserDto) {
    
    // const userExists = await User.findOne({
    //   id: user.id
    // })
    // if (userExists === undefined) return { msg: 'user not found' }
    // const isMatch = await bcrypt.compare(user.password, userExists.password);
    // if (isMatch) {
    //   console.log("userExists")
    //   userExists.password = await this.encriptPassword(user.new_password)
    //   console.log(userExists)
    //   return await this.usersRepository.save(userExists)
    // }
    // else{
    //   return {errorMsg: "password doesn't match"}
    // }
    
    // token = authorization.substring(7, authorization.length);
    // let buff = await Buffer.from(token, 'base64');
    // let data = await JSON.parse(buff.toString('ascii'))

  }

  async delete_profile() {

  }

  async encriptPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async onModuleInit() {
    const userEntity: User = User.create();
    userEntity.name = 'admin'
    userEntity.user_name = 'admin'
    userEntity.email = 'admin@gmail.com'
    userEntity.password = await this.encriptPassword('admin')
    userEntity.role = 'admin'

    const total = await this.usersRepository.count()
    if (total == 0) {
      await this.usersRepository.save(userEntity)
      console.log(`Fresh Initialization! ... Abir Hosen Ashik ...\nAdmin Info -\nuser:admin, password:admin'`);
    } else {
      console.log('Admin Info -\nuser:admin, password:admin');
    }
  }
}
