const express=require('express');
const AuthController = require('../controllers/AuthController');
const AuthRoutes=express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Login:
 *        type: object
 *        required:
 *          - Email
 *          - Password
 *        properties:
 *          Email:
 *           type: string
 *           description: User's Email
 *           example: 'hospital123@gmail.com'
 *          Password:
 *           type: string
 *           description: User's Password
 *           example: 'hospital123'
 *         
 */

/**
 * @swagger
 * tags:
 *     name: Authentication
 *     description: The Authentication managing API endpoint
 */



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     security:
 *       - jwt: []
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'    
 *     responses:
 *       200:
 *         description: User login successfully
 *       500:
 *         description: Some Server Error
 */


AuthRoutes.post('/login',AuthController.login)

module.exports=AuthRoutes