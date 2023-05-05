import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { ExclusionMetadata } from "typeorm/metadata/ExclusionMetadata";
import {v4 as uuid} from "uuid";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 75
    })
    name: string

    @Column({
        length: 75,
        unique: true
    })
    email: string

    
    @Column()
    isAdm: boolean
    
    @Column('boolean', {default: true})
    isActive: boolean = true
    
    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date

    @Column({
        length: 120
    })
    @Exclude()
    password: string

}

