export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "API de Gestão e Reserva de Coworking",
        version: "1.0.0",
        description: "Documentação da API do sistema de gestão de coworking. Permite gerenciar usuários, salas e reservas, com autenticação via JWT e soft lock para prevenção de condição de corrida em reservas.",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor local de desenvolvimento",
        },
    ],
    tags: [
        { name: "Auth", description: "Autenticação" },
        { name: "Usuários", description: "Gestão de usuários" },
        { name: "Salas", description: "Gestão de salas" },
        { name: "Reservas", description: "Gestão de reservas" },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            Sala: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    nome: { type: "string" },
                    tipo: { type: "string", enum: ["sala", "cabine"] },
                    capacidade: { type: "integer" },
                    descricao: { type: "string", nullable: true },
                    preco_locacao: { type: "number" },
                },
            },
            Usuario: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    nome: { type: "string" },
                    email: { type: "string" },
                    telefone: { type: "string", nullable: true },
                    cpf: { type: "string" },
                    e_admin: { type: "boolean" },
                },
            },
            Reserva: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    id_usuario: { type: "integer" },
                    id_sala: { type: "integer" },
                    dia: { type: "string", format: "date-time" },
                    turno: { type: "string" },
                    status: { type: "string", enum: ["pendente", "confirmada", "cancelada"] },
                    expira_em: { type: "string", format: "date-time", nullable: true },
                },
            },
        },
    },
    paths: {
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Autentica um usuário e retorna um token JWT",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string" },
                                    senha: { type: "string" },
                                },
                                required: ["email", "senha"],
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Login bem-sucedido, retorna token e dados do usuário" },
                    401: { description: "Credenciais inválidas" },
                },
            },
        },
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Lista todos os usuários (admin)",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Lista de usuários" },
                    401: { description: "Token não fornecido ou inválido" },
                    403: { description: "Acesso restrito a administradores" },
                },
            },
            post: {
                tags: ["Usuários"],
                summary: "Cadastra um novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    nome: { type: "string" },
                                    email: { type: "string" },
                                    senha: { type: "string" },
                                    telefone: { type: "string" },
                                    cpf: { type: "string" },
                                },
                                required: ["nome", "email", "senha", "cpf"],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Usuário criado" },
                    400: { description: "Dados inválidos" },
                },
            },
        },
        "/usuarios/{id}": {
            get: {
                tags: ["Usuários"],
                summary: "Busca um usuário pelo ID (admin)",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                responses: {
                    200: { description: "Usuário encontrado" },
                    404: { description: "Usuário não encontrado" },
                },
            },
            delete: {
                tags: ["Usuários"],
                summary: "Remove um usuário (admin)",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                responses: {
                    204: { description: "Usuário removido" },
                },
            },
        },
        "/salas": {
            get: {
                tags: ["Salas"],
                summary: "Lista todas as salas",
                responses: {
                    200: { description: "Lista de salas" },
                },
            },
            post: {
                tags: ["Salas"],
                summary: "Cria uma nova sala (admin)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Sala" },
                        },
                    },
                },
                responses: {
                    201: { description: "Sala criada" },
                    400: { description: "Dados inválidos" },
                },
            },
        },
        "/salas/{id}": {
            get: {
                tags: ["Salas"],
                summary: "Busca uma sala pelo ID",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                responses: {
                    200: { description: "Sala encontrada" },
                    404: { description: "Sala não encontrada" },
                },
            },
            put: {
                tags: ["Salas"],
                summary: "Atualiza uma sala (admin)",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                responses: {
                    200: { description: "Sala atualizada" },
                },
            },
            delete: {
                tags: ["Salas"],
                summary: "Remove uma sala (admin)",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                responses: {
                    204: { description: "Sala removida" },
                },
            },
        },
        "/reservas": {
            get: {
                tags: ["Reservas"],
                summary: "Lista todas as reservas (admin)",
                responses: {
                    200: { description: "Lista de reservas" },
                },
            },
            post: {
                tags: ["Reservas"],
                summary: "Cria uma reserva com status pendente e soft lock de 10 minutos",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id_usuario: { type: "integer" },
                                    id_sala: { type: "integer" },
                                    dia: { type: "string", format: "date-time" },
                                    turno: { type: "string" },
                                },
                                required: ["id_usuario", "id_sala", "dia", "turno"],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Reserva criada" },
                    409: { description: "Sala já reservada nesse dia e turno" },
                },
            },
        },
        "/reservas/minhas": {
            get: {
                tags: ["Reservas"],
                summary: "Lista as reservas do usuário autenticado",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Lista de reservas do usuário" },
                    401: { description: "Token não fornecido ou inválido" },
                },
            },
        },
        "/reservas/{id}": {
            get: {
                tags: ["Reservas"],
                summary: "Busca uma reserva pelo ID",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                responses: {
                    200: { description: "Reserva encontrada" },
                    404: { description: "Reserva não encontrada" },
                },
            },
            patch: {
                tags: ["Reservas"],
                summary: "Atualiza o status de uma reserva (confirmar ou cancelar)",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "string", enum: ["confirmada", "cancelada"] },
                                },
                                required: ["status"],
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Status atualizado" },
                    400: { description: "Status inválido" },
                },
            },
        },
    },
};
//# sourceMappingURL=swagger.js.map