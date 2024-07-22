"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
// Swagger configuration
exports.options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tasks API',
            version: '1.0.0',
            description: 'A simple Express library API to manage user tasks. This API allows you to create, read, update, and delete tasks for authenticated users.',
        },
        servers: [
            {
                url: process.env.SERVER_URL
            },
        ],
    },
    apis: ['./src/routes/v1/*.ts', './src/database/models/*.ts', './src/schemas/*.ts'],
};
//# sourceMappingURL=swaggerOptions.js.map