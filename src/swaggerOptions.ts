export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Tasks API',
        version: '1.0.0',
        description: 'A simple Express library API to manage tasks',
        },
        servers: [
        {
            url: process.env.SERVER_URL
        },
        ],
    },
    apis: ['./src/routes/v1/*.ts', './src/database/models/*.ts', './src/schemas/*.ts'],
};