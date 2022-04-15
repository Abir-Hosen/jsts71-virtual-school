import { Course } from 'src/course/course.model';
import { User } from 'src/user/user.model';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, JoinTable, OneToOne, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string;

    @Column("simple-json")
    options: { option_one: string, option_two: string };

    @Column()
    answer: string;

    @ManyToOne(() => User, (user) => user.question)
    @JoinColumn()
    teacher: User

    @ManyToMany(() => Course, course => course.question, {
        eager: false,
        cascade: true,
    })
    @JoinTable()
    course: Course[]
}
