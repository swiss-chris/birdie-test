import { EventEntity } from "../entities/event-entity";
import { getManager } from "typeorm";

export class EventRepo {
    getAllEvents() {
        // get Employee repository and find all employees
        return getManager().getRepository(EventEntity).find();
    }
}