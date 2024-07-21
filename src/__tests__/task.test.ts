import supertest from "supertest";
import { assignJWT } from "../utils/createToken";
import app from "../app";


export const taskPayload = {
    title: "Task 1",
    description: "Task 1 description",
    limitDate: "2024-12-12",
};