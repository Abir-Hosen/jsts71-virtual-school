import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
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

  
  private readonly logger = new Logger(UserService.name);

  async sign_up(user: UserDto): Promise<User> {
    this.logger.log('Sign up for user');
    user.password = await this.encriptPassword(user.password)
    return await this.usersRepository.save(user)
  }

  async get_all() {
    this.logger.log('Getting all user');
    return await this.usersRepository.find()
  }

  async sign_in(user: UserDto): Promise<any> {
    this.logger.log('Sign in for user');
    const userExists = await User.findOne({
      user_name: user.user_name,
      isActive: true,
    })
    if (userExists === undefined) return { msg: 'user not found' }
    const isMatch = await bcrypt.compare(user.password, userExists.password);
    if (isMatch) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime() + 10 * 60000;

      var user_data = {
        id: userExists.id,
        name: userExists.user_name,
        email: userExists.email,
        role: userExists.role,
        isActive: userExists.isActive,
        validate_time: timestamp
      }
      return { valid: true, 'Bearer': Buffer.from(JSON.stringify(user_data)).toString('base64'), user_data }
    }
    return {msg: 'not valid user', valid: false};
  }

  async update_profile(userDto: UserDto) {
    this.logger.log('Updating user . . .');
    return await this.usersRepository.save(userDto)

  }

  async update_password(user: UserDto) {
    this.logger.log('Updating user password');
    const userExists = await User.findOne({
      id: user.id
    })
    if (userExists === undefined) return { msg: 'user not found' }
    const isMatch = await bcrypt.compare(user.password, userExists.password);
    if (isMatch) {
      userExists.password = await this.encriptPassword(user.new_password)
      return await this.usersRepository.save(userExists)
    }
    else {
      return { errorMsg: "password doesn't match" }
    }

  }

  async check_token(user: UserDto) {
    
    this.logger.log('Checking user token validity');
    try {
      let token = user.token
      let buff = await Buffer.from(token, 'base64');
      let data = await JSON.parse(buff.toString('ascii'))

      const currentDate = new Date();
      const timestamp = currentDate.getTime()
      const valid = data.validate_time >= timestamp

      if(!valid) return {msg: 'not valid user', valid: false};

      const new_timestamp = currentDate.getTime() + 10 * 60000;

      const userExists = await User.findOne({
        id: data.id
      })

      var user_data = {
        id: userExists.id,
        name: userExists.user_name,
        email: userExists.email,
        role: userExists.role,
        isActive: userExists.isActive,
        validate_time: new_timestamp
      }
      return { valid: true, 'Bearer': Buffer.from(JSON.stringify(user_data)).toString('base64'), user_data }

    } catch (err) {
      return {msg: err, valid: false};
    }
  }

  async delete_profile(id:number) {
    return  await this.usersRepository.delete(id)
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
      this.logger.log(`Fresh Initialization! ... Abir Hosen Ashik ...\nAdmin Info -\nuser:admin, password:admin'`);
    } else {
      this.logger.log('Admin Info -\nuser:admin, password:admin');
    }
  }
}
