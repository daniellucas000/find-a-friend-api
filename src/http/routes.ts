import type { FastifyInstance } from "fastify";
import { register } from "./controllers/orgs/register.js";
import { createPet } from "./controllers/pets/register.js";
import { listPets } from "./controllers/pets/list.js";
import { authenticateOrgSchema, createOrgSchema } from "./schemas/orgs.schema.js";
import { createPetSchema, listPetsSchema } from "./schemas/pets.schema.js";
import { authenticate } from "./controllers/orgs/authenticate.js";
import { profile } from "./controllers/orgs/profile.js";

export async function appRoutes(app: FastifyInstance) {
    app.post('/orgs', { schema: createOrgSchema }, register)
    app.post('/orgs/session', { schema: authenticateOrgSchema }, authenticate)
    app.post('/pets', { schema: createPetSchema }, createPet)
    app.get('/pets', { schema: listPetsSchema }, listPets)

    app.get('/me', profile)
}