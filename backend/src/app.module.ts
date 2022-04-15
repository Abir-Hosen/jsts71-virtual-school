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
import { CourseController } from './course/course.controller';
import { ExamController } from './exam/exam.controller';
import { QuestionController } from './question/question.controller';

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
        { path: 'user/sign_in', method: RequestMethod.POST },
        { path: 'user/check_token', method: RequestMethod.POST },
        { path: 'course/fetch_all_course', method: RequestMethod.GET },
        { path: 'user/get_all', method: RequestMethod.GET }
      )
      .forRoutes(UserController, CourseController, ExamController, QuestionController);
  }

}
