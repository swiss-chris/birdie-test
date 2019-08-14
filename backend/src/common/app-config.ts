import "reflect-metadata";
import { ConnectionOptions } from "typeorm";

export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
    port: 3306,
    username: 'test-read',
    password: 'xnxPp6QfZbCYkY8',
    database: 'birdietest',
    entities: [
        __dirname + '/../entities/*.ts'
    ],
    synchronize: true,
}