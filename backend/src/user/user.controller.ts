import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('sign_up')
  async sign_up(@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {

    let resp;
    try {
      resp = await this.userService.sign_up(userDto)
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp
  }

  @Get('get_all')
  async get_all(@Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.userService.get_all()
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp;
  }

  @Post('sign_in')
  async sign_in(@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.userService.sign_in(userDto);
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp;
  }

  @Post('update_profile')
  async update_profile(@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {

    let resp;
    try {
      resp = await this.userService.update_profile(userDto);
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp;
  }

  @Post('update_password')
  async update_password(@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.userService.update_password(userDto);
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }

    return resp;
  }

  @Delete('delete_profile/:id')
  async delete_profile(@Param('id') id: number, @Res() response: Response) {
    
    let resp;
    try {
      resp = await this.userService.delete_profile(id);
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }

    return resp;
  }

  @Post('check_token')
  async check_token(@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.userService.check_token(userDto);
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp;
  }

}
