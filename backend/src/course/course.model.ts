import { Question } from 'src/question/question.model';
import { User } from 'src/user/user.model';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, JoinTable, OneToOne, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Course {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.teacherCourses)
  @JoinColumn()
  teacher: User

  @OneToMany(() => Question, question => question.course)
  question: Question[]

  @ManyToMany(() => User, user => user.courses, {
    eager: false,
    cascade: true,
  })
  @JoinTable()
  student: User[]
}
