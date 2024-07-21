import supertest from "supertest";
import { assignJWT } from "../utils/createToken";
import app from "../app";
import User from "../database/models/user";

export const userPayload = {
    id: "8aeec202-bac9-409e-aff4-d60680898b2b",
    email: "marcos@gmail.com",
    password: "adcadc",
};

jest.mock('../database/models/user');
jest.mock('../database/models/task');

describe("tasks routes", () => {
    describe("get user by id", () => {
        describe("when no access token are provided", () => {
            it("should return an 401 unauthorize response", async () => {
                const taskId = '50';
                await supertest(app).get(`/api/home/tasks/${taskId}`).expect(401)
            } );
        });
        describe("when access token is provided but no task exist", () => {
            it("should return an 404 not found response", async () => {
                const taskId = '50';
                const userTarget = await User.findOne({ where: { email: userPayload.email } });
                if (!userTarget) {
                    throw new Error("User not found");
                }
                const token = assignJWT({id: userTarget.id}, process.env.ACCESS_TOKEN_SECRET as string, process.env.ACCESS_TOKEN_EXPIRATION as string);
                await supertest(app).get(`/api/home/tasks/${taskId}`).set("Authorization", `Bearer ${token}`).expect(404)
            } );
        });
    });
});