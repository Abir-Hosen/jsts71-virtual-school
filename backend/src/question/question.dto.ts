import { Course } from "src/course/course.model";
import { User } from "src/user/user.model";

export class QuestionDto {

  // id: number;
  question: string;
  options: {};
  answer: string;
  teacher: User;
  course: Course[];
}