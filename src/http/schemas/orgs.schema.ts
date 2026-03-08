export const createOrgSchema = {
    tags: ['Orgs'],
        summary: 'Cadastrar uma nova org',
        body: {
            type: 'object',
            required: ['name', 'email', 'password', 'cep', 'address', 'whatsapp_number'],
            properties: {
                name:             { type: 'string' },
                email:            { type: 'string', format: 'email' },
                password:         { type: 'string', minLength: 6 },
                cep:              { type: 'string' },
                address:          { type: 'string' },
                whatsapp_number:  { type: 'string' },
            }
        },
        response: {
            201: { description: 'Organização criada com sucesso' },
            409: {
                description: 'Email já cadastrado',
                type: 'object',
                properties: {
                message: { type: 'string' }
            }
        }
    }
}

export const authenticateOrgSchema = {
    tags: ['Orgs'],
    summary: 'Autenticar organização',
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email:    { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
        }
    },
    response: {
        200: {
            description: 'Autenticado com sucesso',
            type: 'object',
            properties: {
                token: { type: 'string' }
            }
        },
        401: {
            description: 'Credenciais inválidas',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
}