"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'eComm',
        version: '1.0.0',
        description: 'API documentation for your application',
    },
    servers: [
        {
            url: 'http://localhost:4000', // Replace with your server URL
            description: 'Local server',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['/src/routes/userRoutes.ts'], // Path to your route files (specify the path to your route files)
};
console.log("options:----------", options);
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerSetup = (app) => {
    app.use('/api-docs', require('swagger-ui-express').serve, require('swagger-ui-express').setup(swaggerSpec));
};
exports.swaggerSetup = swaggerSetup;
//# sourceMappingURL=swaggerConfig.js.map