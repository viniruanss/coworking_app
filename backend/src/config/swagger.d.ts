export declare const swaggerDocument: {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
    };
    servers: {
        url: string;
        description: string;
    }[];
    tags: {
        name: string;
        description: string;
    }[];
    components: {
        securitySchemes: {
            bearerAuth: {
                type: string;
                scheme: string;
                bearerFormat: string;
            };
        };
        schemas: {
            Sala: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    nome: {
                        type: string;
                    };
                    tipo: {
                        type: string;
                        enum: string[];
                    };
                    capacidade: {
                        type: string;
                    };
                    descricao: {
                        type: string;
                        nullable: boolean;
                    };
                    preco_locacao: {
                        type: string;
                    };
                };
            };
            Usuario: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    nome: {
                        type: string;
                    };
                    email: {
                        type: string;
                    };
                    telefone: {
                        type: string;
                        nullable: boolean;
                    };
                    cpf: {
                        type: string;
                    };
                    e_admin: {
                        type: string;
                    };
                };
            };
            Reserva: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    id_usuario: {
                        type: string;
                    };
                    id_sala: {
                        type: string;
                    };
                    dia: {
                        type: string;
                        format: string;
                    };
                    turno: {
                        type: string;
                    };
                    status: {
                        type: string;
                        enum: string[];
                    };
                    expira_em: {
                        type: string;
                        format: string;
                        nullable: boolean;
                    };
                };
            };
        };
    };
    paths: {
        "/auth/login": {
            post: {
                tags: string[];
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    email: {
                                        type: string;
                                    };
                                    senha: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    401: {
                        description: string;
                    };
                };
            };
        };
        "/usuarios": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    401: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    nome: {
                                        type: string;
                                    };
                                    email: {
                                        type: string;
                                    };
                                    senha: {
                                        type: string;
                                    };
                                    telefone: {
                                        type: string;
                                    };
                                    cpf: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        "/usuarios/{id}": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    204: {
                        description: string;
                    };
                };
            };
        };
        "/salas": {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        "/salas/{id}": {
            get: {
                tags: string[];
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
            put: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    204: {
                        description: string;
                    };
                };
            };
        };
        "/reservas": {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    id_usuario: {
                                        type: string;
                                    };
                                    id_sala: {
                                        type: string;
                                    };
                                    dia: {
                                        type: string;
                                        format: string;
                                    };
                                    turno: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    409: {
                        description: string;
                    };
                };
            };
        };
        "/reservas/minhas": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    401: {
                        description: string;
                    };
                };
            };
        };
        "/reservas/{id}": {
            get: {
                tags: string[];
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
            patch: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    status: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=swagger.d.ts.map