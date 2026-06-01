import { BaseEntity } from "src/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}