const express=require('express');
const PatientController = require('../controllers/PatientController');
const validation = require('../middleware/validation');
const CheckAuth = require('../middleware/checkAuth');
const PatientRoutes=express.Router();


/**
 * @swagger
 *  components:
 *    schemas:
 *      patient:
 *        type: object
 *        required:
 *          - patientName
 *          - sex
 *          - PhoneNo
 *        properties:
 *          patientName:
 *           type: string
 *           description: User's patientName
 *          sex:
 *           type: string
 *           description: User's sex
 *          PhoneNo:
 *           type: integer
 *           description: User's PhoneNo
 *         
 */

/**
 * @swagger
 * tags:
 *     name: Patient
 *     description: The Patient managing API endpoint
 */



/**
 * @swagger
 * /api/patient:
 *   post:
 *     summary: Create new Patient
 *     security:
 *       - jwt: []
 *     tags: [Patient]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patient'    
 *     responses:
 *       200:
 *         description: Created Patient successfully
 *       500:
 *         description: Some Server Error
 */

PatientRoutes.post('/',CheckAuth.verificationToken,validation.patientValidate,PatientController.createPatient);

/**
 * @swagger
 * /api/patient:
 *   get:
 *     summary: List of all Patient
 *     security:
 *       - jwt: []
 *     tags: [Patient]
 *     responses:
 *      200:
 *          description: Patient List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

PatientRoutes.get('/',CheckAuth.verificationToken,PatientController.getAllPatient)

/**
 * @swagger
 * /api/patient/{id}:
 *   get:
 *     summary: Retrieve Patient
 *     security:
 *       - jwt: []
 *     tags: [Patient]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Patient's id
 *     responses:
 *      200:
 *          description: Patient retrieved successfully
 *      500:
 *          description: Some Server Error
 */

PatientRoutes.get('/:id',CheckAuth.verificationToken,PatientController.getPatientById)

/**
 * @swagger
 * /api/patient/{id}:
 *   patch:
 *     summary: Update Patient
 *     security:
 *       - jwt: []
 *     tags: [Patient]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Patient's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patient'
 *     responses:
 *      200:
 *          description: Patient updated successfully
 *      500:
 *          description: Some Server Error
 */

PatientRoutes.patch('/:id',CheckAuth.verificationToken,validation.patientValidate,PatientController.updatePatientById);

/**
 * @swagger
 * /api/patient/{id}:
 *   delete:
 *     summary: delete Patient
 *     security:
 *       - jwt: []
 *     tags: [Patient]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Patient's id
 *     responses:
 *      200:
 *          description: Patient deleted successfully
 *      500:
 *          description: Some Server Error
 */
;
PatientRoutes.delete('/:id',CheckAuth.verificationToken,PatientController.deletePatientById)

module.exports=PatientRoutes