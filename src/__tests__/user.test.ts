import supertest from "supertest";
import { assignJWT } from "../utils/createToken";
import app from "../app";

export const userPayload = {
    name: "Maros",
    email: "marcos@gmail.com",
    password: "adcadc",
};


describe("User", () => {
    describe("get user by id", () => {
        describe("when the user exists", () => {
            it("returns the specific user", async () => {
                //const user = assignJWT(userPayload);
                const task = await user.createTask(taskPayload);
                const res = await supertest(app)
                    .get(`/api/home/tasks/${task.id}`)
                    .set("Authorization", `Bearer ${user.accessToken}`)
                    .expect(200);
                expect(res.body.title).toEqual(task.title);
                expect(res.body.description).toEqual(task.description);
                expect(res.body.limitDate).toEqual(task.limitDate);
            });
        });
    });
});