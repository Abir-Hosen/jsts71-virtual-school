import { User } from "src/user/user.model";

export class CourseDto {
  id: number;
  name: string;
  teacher: User;
  student: User[];
  student_id: number;
}

