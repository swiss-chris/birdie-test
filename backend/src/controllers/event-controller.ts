import { Request, Response } from "express";
import { EventRepo } from "../repositories/event-repository";

export let getAllEvents = async (_: Request, res: Response) => {
    let empRepo: EventRepo = new EventRepo();

    console.log("Received GetAllEvents ==> GET");

    empRepo.getAllEvents().then((result: any) => {
        console.log("Result : " + result);
        res.send(result);
    });
};