import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
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
      console.log(resp)
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    console.log(resp)
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
      console.log(resp)
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    
    console.log(resp)
    return resp;
  }

  @Put('delete_profile/:id')
  async delete_profile(@Param('id') id: string, @Res() response: Response) {
    return null;
  }

  @Put('check_token')
  async check_token(@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {
    return null;
  }

}
