const express=require('express');
const TreatmentController = require('../controllers/TreatmentController');
const validation = require('../middleware/validation');
const CheckAuth = require('../middleware/checkAuth');
const TreatmentRoutes=express.Router();


/**
 * @swagger
 *  components:
 *    schemas:
 *      treatment:
 *        type: object
 *        required:
 *          - treatmentName
 *          - patientId
 *          - doctorId
 *          - roomNo
 *        properties:
 *          treatmentName:
 *           type: string
 *           description: treatment's treatmentName
 *          patientId:
 *           type: integer
 *           description: treament's patientId
 *          doctorId:
 *           type: integer
 *           description: treament's doctorId
 *          roomNo:
 *           type: integer
 *           description: treament's roomNo
 *         
 */

/**
 * @swagger
 * tags:
 *     name: Treatment
 *     description: The Treatment managing API endpoint
 */



/**
 * @swagger
 * /api/treatment:
 *   post:
 *     summary: Create new Treatment
 *     security:
 *       - jwt: []
 *     tags: [Treatment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/treatment'    
 *     responses:
 *       200:
 *         description: Created Treatment successfully
 *       500:
 *         description: Some Server Error
 */

TreatmentRoutes.post('/',CheckAuth.verificationToken,validation.treatmentValidate,TreatmentController.createTreatment);


/**
 * @swagger
 * /api/treatment:
 *   get:
 *     summary: List of all Treatment
 *     security:
 *       - jwt: []
 *     tags: [Treatment]
 *     responses:
 *      200:
 *          description: Treatment List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

TreatmentRoutes.get('/',CheckAuth.verificationToken,TreatmentController.getAllTreatment);

/**
 * @swagger
 * /api/treatment/{id}:
 *   get:
 *     summary: Retrieve Treatment
 *     security:
 *       - jwt: []
 *     tags: [Treatment]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Treatment's id
 *     responses:
 *      200:
 *          description: Treatment retrieved successfully
 *      500:
 *          description: Some Server Error
 */

TreatmentRoutes.get('/:id',CheckAuth.verificationToken,TreatmentController.getTreatmentById);

/**
 * @swagger
 * /api/treatment/{id}:
 *   patch:
 *     summary: Update Treatment
 *     security:
 *       - jwt: []
 *     tags: [Treatment]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Treatment's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/treatment'
 *     responses:
 *      200:
 *          description: Treatment updated successfully
 *      500:
 *          description: Some Server Error
 */

TreatmentRoutes.patch('/:id',CheckAuth.verificationToken,validation.treatmentValidate,TreatmentController.updateTreatmentById);

/**
 * @swagger
 * /api/treatment/{id}:
 *   delete:
 *     summary: delete Treatment
 *     security:
 *       - jwt: []
 *     tags: [Treatment]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Treatment's id
 *     responses:
 *      200:
 *          description: Treatment deleted successfully
 *      500:
 *          description: Some Server Error
 */

TreatmentRoutes.delete('/:id',CheckAuth.verificationToken,TreatmentController.deleteTreatmentById)

module.exports=TreatmentRoutes