import {Entity, Column,  PrimaryGeneratedColumn} from "typeorm";

@Entity("events")
export class EventEntity {

    @PrimaryGeneratedColumn()
    payload!: JSON;

    @Column()
    event_type!: string;

    @Column()
    care_recipient_id!: string;

    @Column()
    timestamp!: string;
}