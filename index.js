const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 3000;

// Configuração do Swagger
const options = {
  definition: swaggerDocument,
  apis: ['./index.js'], // onde buscar as anotações swagger
};

const swaggerSpec = swaggerJsdoc(options);

// Rota GET
/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Retorna uma mensagem de olá
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Olá, mundo!
 */
app.get('/hello', (req, res) => {
  res.json({ message: 'Olá, mundo!' });
});

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`API ouvindo em http://localhost:${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});
