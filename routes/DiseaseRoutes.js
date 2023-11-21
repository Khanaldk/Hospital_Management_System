const express=require('express');
const DiseaseController = require('../controllers/DiseaseController');
const validation = require('../middleware/validation');
const CheckAuth = require('../middleware/checkAuth');
const DiseaseRoutes=express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      disease:
 *        type: object
 *        required:
 *          - patientId
 *          - diseaseName
 *        properties:
 *          patientId:
 *           type: integer
 *           description: disease's patientId
 *          diseaseName:
 *           type: string
 *           description: disease's diseaseName
 *         
 */

/**
 * @swagger
 * tags:
 *     name: Disease
 *     description: The Disease managing API endpoint
 */


/**
 * @swagger
 * /api/disease:
 *   post:
 *     summary: Create new Disease
 *     security:
 *       - jwt: []
 *     tags: [Disease]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/disease'    
 *     responses:
 *       200:
 *         description: Created Disease successfully
 *       500:
 *         description: Some Server Error
 */

DiseaseRoutes.post('/',CheckAuth.verificationToken,validation.diseaseValidate,DiseaseController.createDisease);

/**
 * @swagger
 * /api/disease:
 *   get:
 *     summary: List of all Disease
 *     security:
 *       - jwt: []
 *     tags: [Disease]
 *     responses:
 *      200:
 *          description: Disease List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

DiseaseRoutes.get('/',CheckAuth.verificationToken,DiseaseController.getAllDisease).all


/**
 * @swagger
 * /api/disease/{id}:
 *   get:
 *     summary: Retrieve Disease
 *     security:
 *       - jwt: []
 *     tags: [Disease]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Disease's id
 *     responses:
 *      200:
 *          description: Disease retrieved successfully
 *      500:
 *          description: Some Server Error
 */

DiseaseRoutes.get('/:id',CheckAuth.verificationToken,DiseaseController.getDiseaseById);


/**
 * @swagger
 * /api/disease/{id}:
 *   patch:
 *     summary: Update Disease
 *     security:
 *       - jwt: []
 *     tags: [Disease]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Disease's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/disease'
 *     responses:
 *      200:
 *          description: Disease updated successfully
 *      500:
 *          description: Some Server Error
 */

DiseaseRoutes.patch('/:id',CheckAuth.verificationToken,validation.diseaseValidate,DiseaseController.updateDiseaseById);

/**
 * @swagger
 * /api/disease/{id}:
 *   delete:
 *     summary: delete Disease
 *     security:
 *       - jwt: []
 *     tags: [Disease]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Disease's id
 *     responses:
 *      200:
 *          description: Disease deleted successfully
 *      500:
 *          description: Some Server Error
 */

DiseaseRoutes.delete('/:id',CheckAuth.verificationToken,DiseaseController.deletePatientById)

module.exports=DiseaseRoutes