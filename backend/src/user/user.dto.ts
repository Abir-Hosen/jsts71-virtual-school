import { Course } from "src/course/course.model";

export class UserDto {

  id: number
  name: string;
  user_name: string;
  email: string;
  password: string;
  new_password: string;
  role: string;
  isActive: boolean;
  courses: Course[];
  token: string;
}