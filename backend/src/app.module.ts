import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { CourseModule } from './course/course.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { QuestionModule } from './question/question.module';
import { ExamModule } from './exam/exam.module';
import { datasource } from './config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot(datasource), UserModule, CourseModule, QuestionModule, ExamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'user/sign_up', method: RequestMethod.POST },
        { path: 'user/sign_in', method: RequestMethod.POST }
      )
      .forRoutes(UserController);
  }

}
