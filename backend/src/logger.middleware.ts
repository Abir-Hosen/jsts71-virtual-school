import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let authorization, token, data;

    if (authorization = req.headers['authorization']) {

      try {
        token = authorization.substring(7, authorization.length);
        let buff = await Buffer.from(token, 'base64');
        let data = await JSON.parse(buff.toString('ascii'))

        const currentDate = new Date();
        const timestamp = currentDate.getTime()
        const valid = data.validate_time >= timestamp
        if (valid) {
          return next();
        } else {
          res.statusCode = 401
          res.setHeader("WWW-Authenticate", "Basic realm=\"Login Strict\"")
          res.send({ msg: 'Unauthorized user' })
        }

      } catch (err) {
        console.error('Token not valid')

        res.statusCode = 400
        res.setHeader("WWW-Authenticate", "Basic realm=\"Login Strict\"")
        res.send({ msg: 'Token not valid' })
      }

    }

  }
}
