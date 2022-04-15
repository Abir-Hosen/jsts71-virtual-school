import { Course } from 'src/course/course.model';
import { User } from 'src/user/user.model';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    exam: string;

    @Column()
    answer: string;

    @Column()
    marks: number;

    @OneToOne(() => Course)
    @JoinColumn()
    course: Course

    @OneToOne(() => User)
    @JoinColumn()
    student: User
}