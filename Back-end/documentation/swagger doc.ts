import { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const x = (app: Application) => {
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
    apis: ["./documentation/swagger doc.ts"],
  };

  const openapiSpecification = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  // Swagger API Docs
  // Groups
  // - User group
  /**
   * @swagger
   * tags:
   *   name: Account Endpoint
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
   *     tags: [Account Endpoint]
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
   *    tags: [Account Endpoint]
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
   *     tags: [Account Endpoint]
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
  ////////////////////////////////////////////////////////////////////////////
  // Forget password
  /**
   * @swagger
   * components:
   *   schemas:
   *     Forget password:
   *       type: object
   *       required:
   *         - email
   *       properties:
   *         email:
   *           type: string
   *       example:
   *         email: mohammedsalah6055@gmail.com
   */
  /**
   * @swagger
   * /forgetpassword:
   *   put:
   *     summary: Send password code to user
   *     tags: [Account Endpoint]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Forget password'
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: User Not Found
   *       400:
   *         description: Invaild Data Entry
   *       500:
   *         description: Server Error
   */
  //////////////////////////////////////////////////////////////////
  // Change password
  /**
   * @swagger
   * components:
   *   schemas:
   *     Change password:
   *       type: object
   *       required:
   *         - uniq
   *         - password
   *       properties:
   *         uniq:
   *           type: string
   *           description: You can get "uniq" when using "/forgotpassword" through the email used.
   *         password:
   *           type: string
   *       example:
   *         uniq: sdg5s5dg151
   *         password: Mohammed123#
   */
  /**
   * @swagger
   * /changepassword:
   *   put:
   *     summary: Change user is password
   *     tags: [Account Endpoint]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Change password'
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: User Not Found
   *       400:
   *         description: Invaild Data Entry
   *       500:
   *         description: Server Error
   */
};

export default x;
