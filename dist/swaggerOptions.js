"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tasks API',
            version: '1.0.0',
            description: 'A simple Express library API to manage tasks',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/v1/*.ts', './src/database/models/*.ts', './src/validators/schemas/*.ts'],
};
//# sourceMappingURL=swaggerOptions.js.map