import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Налаштування для swagger-jsdoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies API',
      version: '1.0.0',
      description: 'API для отримання фільмів та жанрів'
    }
  },
  apis: ['./src/routes/*.js'] // Вкажіть шлях до ваших роутів для генерації документації
};

// Генерація Swagger документації
const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
