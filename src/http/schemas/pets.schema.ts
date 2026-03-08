export const createPetSchema = {
    tags: ['Pets'],
    summary: 'Cadastrar um novo pet',
    body: {
        type: 'object',
        required: ['name', 'age', 'size', 'energy', 'level_independence', 'environment', 'photo', 'org_id'],
        properties: {
            name:               { type: 'string' },
            about:              { type: 'string' },
            age:                { type: 'string', enum: ['puppy', 'adult', 'senior'] },
            size:               { type: 'string', enum: ['small', 'medium', 'large', 'giant'] },
            energy:             { type: 'string', enum: ['low', 'medium', 'high'] },
            level_independence: { type: 'string', enum: ['low', 'medium', 'high'] },
            environment:        { type: 'string', enum: ['small', 'medium', 'large', 'giant'] },
            photo:              { type: 'string' },
            org_id:             { type: 'string', format: 'uuid' },
            adoptionRequirements: {
                type: 'array',
                items: { type: 'string' }
            },
        }
    },
    response: {
        201: { description: 'Pet cadastrado com sucesso' },
        404: {
            description: 'Organização não encontrada',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
}

export const listPetsSchema = {
    tags: ['Pets'],
    summary: 'Listar pets',
    querystring: {
        type: 'object',
        properties: {
            city:               { type: 'string' },
            state:              { type: 'string' },
            age:                { type: 'string', enum: ['puppy', 'adult', 'senior'] },
            size:               { type: 'string', enum: ['small', 'medium', 'large', 'giant'] },
            energy:             { type: 'string', enum: ['low', 'medium', 'high'] },
            level_independence: { type: 'string', enum: ['low', 'medium', 'high'] },
        }
    },
    response: {
        200: {
            description: 'Lista de pets',
            type: 'object',
            properties: {
                pets: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id:    { type: 'string', format: 'uuid' },
                            name:  { type: 'string' },
                            age:   { type: 'string' },
                            size:  { type: 'string' },
                        }
                    }
                }
            }
        }
    }
}