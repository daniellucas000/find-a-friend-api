import type { FastifyInstance } from "fastify";
import { register } from "./controllers/orgs/register.js";
import { createPet } from "./controllers/pets/register.js";
import { listPets } from "./controllers/pets/list.js";
import { authenticateOrgSchema, createOrgSchema } from "./schemas/orgs.schema.js";
import { createPetSchema, listPetsSchema } from "./schemas/pets.schema.js";
import { authenticate } from "./controllers/orgs/authenticate.js";
import { profile } from "./controllers/orgs/profile.js";
import { verifyJWT } from "./middlewares/verify-jwt.js";
import { refresh } from "./controllers/orgs/refresh.js";

export async function appRoutes(app: FastifyInstance) {
    app.post('/orgs', { schema: createOrgSchema }, register)
    app.post('/orgs/session', { schema: authenticateOrgSchema }, authenticate)
    
    app.post('/pets', { onRequest: [verifyJWT], schema: createPetSchema }, createPet)
    app.get('/pets', { onRequest:[verifyJWT], schema: listPetsSchema }, listPets)

    app.patch('/token/refresh', refresh)
    app.get('/me', { onRequest: [verifyJWT]} ,profile)
}