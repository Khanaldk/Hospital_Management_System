const express=require('express');
const CashierController = require('../controllers/CashierController');
const validation = require('../middleware/validation');
const CheckAuth = require('../middleware/checkAuth');
const CashierRoutes=express.Router();


/**
 * @swagger
 *  components:
 *    schemas:
 *      cashier:
 *        type: object
 *        required:
 *          - hospitalId
 *          - treatmentId
 *          - totalCast
 *        properties:
 *          hospitalId:
 *           type: integer
 *           description: Cashier's hospitalId
 *          treatmentId:
 *           type: integer
 *           description: Cashier's treatmentId
 *          totalCost:
 *           type: integer
 *           description: Cashier's totalCost
 */

/**
 * @swagger
 * tags:
 *     name: Cashier
 *     description: The Cashier managing API endpoint
 */



/**
 * @swagger
 * /api/cashier:
 *   post:
 *     summary: Create new Cashier
 *     security:
 *       - jwt: []
 *     tags: [Cashier]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cashier'    
 *     responses:
 *       200:
 *         description: Created Cashier successfully
 *       500:
 *         description: Some Server Error
 */

CashierRoutes.post('/',CheckAuth.verificationToken,validation.cashierValidate,CashierController.createCashier);

/**
 * @swagger
 * /api/cashier:
 *   get:
 *     summary: List of all Cashier
 *     security:
 *       - jwt: []
 *     tags: [Cashier]
 *     responses:
 *      200:
 *          description: Cashier List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

CashierRoutes.get('/',CheckAuth.verificationToken,CashierController.getAllCashier);

/**
 * @swagger
 * /api/cashier/{id}:
 *   get:
 *     summary: Retrieve Cashier
 *     security:
 *       - jwt: []
 *     tags: [Cashier]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Cashier's id
 *     responses:
 *      200:
 *          description: Cashier retrieved successfully
 *      500:
 *          description: Some Server Error
 */

CashierRoutes.get('/:id',CheckAuth.verificationToken,CashierController.getCashierById);

/**
 * @swagger
 * /api/cashier/{id}:
 *   patch:
 *     summary: Update Cashier
 *     security:
 *       - jwt: []
 *     tags: [Cashier]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Cashier's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cashier'
 *     responses:
 *      200:
 *          description: Cashier updated successfully
 *      500:
 *          description: Some Server Error
 */

CashierRoutes.patch('/:id',CheckAuth.verificationToken,validation.cashierValidate,CashierController.updateCashierById);

/**
 * @swagger
 * /api/cashier/{id}:
 *   delete:
 *     summary: delete Cashier
 *     security:
 *       - jwt: []
 *     tags: [Cashier]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Cashier's id
 *     responses:
 *      200:
 *          description: Cashier deleted successfully
 *      500:
 *          description: Some Server Error
 */

CashierRoutes.delete('/:id',CheckAuth.verificationToken,CashierController.deleteCashierById)

module.exports=CashierRoutes