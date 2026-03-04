import type { FastifyInstance } from "fastify";
import { register } from "./controllers/orgs/register.js";
import { createPet } from "./controllers/pets/register.js";
import { listPets } from "./controllers/pets/list.js";

export async function appRoutes(app: FastifyInstance) {
    app.post('/orgs', register)
    app.post('/pets', createPet)
    app.get('/pets', listPets)
}