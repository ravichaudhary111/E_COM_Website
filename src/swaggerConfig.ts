import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

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
console.log("options:----------",options)

const swaggerSpec = swaggerJSDoc(options);

export const swaggerSetup = (app: Express) => {
  app.use('/api-docs', require('swagger-ui-express').serve, require('swagger-ui-express').setup(swaggerSpec));
};
