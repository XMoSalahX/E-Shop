import express, { Request, Response } from "express";
import route from "./Route/route";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app: express.Application = express();
const address: string = "http://localhost:8003";

app.use(express.json());

app.listen(8003, function () {
  console.log(`starting app on: ${address}`);
});

// Swagger Configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce",
      description:
        "E-commerce website to improve relationship between seller and customer.",
      version: "1.0.0",
      contact: { name: "Mohammed Salah" },
      servers: "http://localhost:8003",
    },
  },
  apis: ["./src/server.ts"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//Route app to route file
route(app);

export default app;

// Swagger API Docs
// Groups
// - User group
/**
 * @swagger
 * tags:
 *   name: User Endpoint
 *   description: CRUD operation for user
 */
//////////////////////////////////////////////////////////////////////////////////
// Create user Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Create User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - responsibility
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         responsibility:
 *           type: string
 *           description: "(Admin - Seller - Customer)"
 *       example:
 *         firstName: Mohammed
 *         lastName: Salah
 *         email: mohammedsalah605s5@gmail.com
 *         password: Mohammed123#
 *         responsibility: Admin
 */

// User Request
/**
 * @swagger
 * /createuser:
 *   post:
 *     summary: Insert new user in database
 *     tags: [User Endpoint]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Create User'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server Error
 */
///////////////////////////////////////////////////////////////////////////
// Active User Request
/**
 * @swagger
 * /verify/{id}:
 *  put:
 *    summary: To active user account
 *    tags: [User Endpoint]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: User id
 *    responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
//////////////////////////////////////////////////////////////////////////////
// Sgin in user request
/**
 * @swagger
 * components:
 *   schemas:
 *     Sign in user:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: mohammedsalah6055@gmail.com
 *         password: Mohammed123#
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Sign in to user account
 *     tags: [User Endpoint]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sign in user'
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: User Not Found
 *       500:
 *         description: Server Error
 */
