const express=require('express');
const UserController = require('../controllers/UserController');
const validation = require('../middleware/validation');
const CheckAuth = require('../middleware/checkAuth');

const UserRoutes=express.Router();


/**
 * @swagger
 *  components:
 *    schemas:
 *      userDetail:
 *        type: object
 *        required:
 *          - FirstName
 *          - LastName
 *          - Email
 *          - Password
 *          - Gender
 *          - Address
 *          - PhoneNo
 *          - UserStatus
 *        properties:
 *          FirstName:
 *           type: string
 *           description: User's FirstName
 *          LastName:
 *           type: string
 *           description: User's LastName
 *          Email:
 *           type: string
 *           description: User's Email
 *           example: 'durga123@gmail.com'
 *          Password:
 *           type: string
 *           description: User's Password
 *          Gender:
 *           type: string
 *           description: User's Gender
 *          Address:
 *           type: string
 *           description: User's Address
 *          PhoneNo:
 *           type: integer
 *           description: User's PhoneNo
 *          UserStatus:
 *           type: string
 *           description: User's UserStatus
 * 
 *         
 */

/**
 * @swagger
 * tags:
 *     name: User
 *     description: The user managing API endpoint
 */



/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create new user
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userDetail'    
 *     responses:
 *       200:
 *         description: Created User successfully
 *       500:
 *         description: Some Server Error
 */


UserRoutes.post('/',CheckAuth.verificationToken,validation.UserValidate,UserController.createUser)

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: List of all User
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     responses:
 *      200:
 *          description: User List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

UserRoutes.get('/',CheckAuth.verificationToken,UserController.getAllUser)

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve User
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: User's id
 *     responses:
 *      200:
 *          description: User retrieved successfully
 *      500:
 *          description: Some Server Error
 */

UserRoutes.get('/:id',CheckAuth.verificationToken,UserController.getUserById);

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: Update User
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: User's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userDetail'
 *     responses:
 *      200:
 *          description: user updated successfully
 *      500:
 *          description: Some Server Error
 */

UserRoutes.patch('/:id',CheckAuth.verificationToken,validation.UserValidate,UserController.updateUserById)

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: delete User
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: User's id
 *     responses:
 *      200:
 *          description: User deleted successfully
 *      500:
 *          description: Some Server Error
 */

UserRoutes.delete('/:id',CheckAuth.verificationToken,UserController.deleteUserById)
module.exports=UserRoutes