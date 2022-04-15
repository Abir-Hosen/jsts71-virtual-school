import { Course } from 'src/course/course.model';
import { Question } from 'src/question/question.model';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, OneToMany, Timestamp } from 'typeorm';


@Entity()
export class Logger extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string;

    @Column({
        type: "varchar",
        length: 750
    })
    message: string;

    @Column()
    time: string;

}
