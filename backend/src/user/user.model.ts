import { Course } from 'src/course/course.model';
import { Question } from 'src/question/question.model';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, OneToMany } from 'typeorm';

enum UserRoles {
    admin = "admin",
    teacher = "teacher",
    student = "student"
}

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column({
        unique: true
    })
    user_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRoles,
        array: false,
        default: UserRoles[UserRoles.student]
    })
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Course, course => course.teacher)
    teacherCourses: Course[]

    @OneToMany(() => Question, question => question.teacher)
    question: Question[]

    @ManyToMany(() => Course, course => course.student, { eager: true })
    courses: Course[]
}
