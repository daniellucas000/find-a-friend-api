import type { FastifyInstance } from "fastify";
import { register } from "./controllers/orgs/register.js";
import { createPet } from "./controllers/pets/register.js";

export async function appRoutes(app: FastifyInstance) {
    app.post('/orgs', register)
    app.post('/pets', createPet)
}