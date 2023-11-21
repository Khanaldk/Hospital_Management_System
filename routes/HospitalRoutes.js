const express=require('express');
const HospitalController = require('../controllers/HospitalController');
const ImageUpload = require('../middleware/fileUploadHelper');
const validation = require('../middleware/validation');
const hospital = require('../models/hospital');
const CheckAuth = require('../middleware/checkAuth');
const HospitalRoutes=express.Router();

/**
 * @swagger
 * tags:
 *     name: Hospital
 *     description: The Hospital managing API endpoint
 */


/**
 * @swagger
 *  /api/hospital:
 *   post:
 *     summary: Posting the Hospital
 *     security:
 *      - jwt: []
 *     tags: [Hospital]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              hospitalName:
 *                type: string
 *                description: hospital's hospitalName
 *              hospitalAddress:
 *                type: string
 *                description: hospital's hospitalAddress
 *              image:
 *                type: string
 *                format: binary
 *              fbLink:
 *                type: string
 *                description: hospital's fbLink
 *              description:
 *                type: text
 *                description: hospital's description
 *     responses:
 *      200:
 *          description: Hospital created successfully
 *      500:
 *          description: Some Server Error
*/

HospitalRoutes.post('/',CheckAuth.verificationToken,ImageUpload.image.single('image'),validation.hospitalValidate,HospitalController.createHospital);

/**
 * @swagger
 * /api/hospital:
 *   get:
 *     summary: List of all Hospital
 *     security:
 *       - jwt: []
 *     tags: [Hospital]
 *     responses:
 *      200:
 *          description: Hospital List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

HospitalRoutes.get('/',CheckAuth.verificationToken,HospitalController.getAllHospital);

/**
 * @swagger
 * /api/hospital/{id}:
 *   get:
 *     summary: Retrieve Hospital
 *     security:
 *       - jwt: []
 *     tags: [Hospital]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Hospital's id
 *     responses:
 *      200:
 *          description: Hospital retrieved successfully
 *      500:
 *          description: Some Server Error
 */

HospitalRoutes.get('/:id',CheckAuth.verificationToken,HospitalController.getHospitalById)

/**
 * @swagger
 *  /api/hospital/{id}:
 *   patch:
 *     summary: Patching the Hospital
 *     security:
 *      - jwt: []
 *     tags: [Hospital]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: assignmentfile's id
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              hospitalName:
 *                type: string
 *                description: hospital's hospitalName
 *              hospitalAddress:
 *                type: string
 *                description: hospital's hospitalAddress
 *              image:
 *                type: string
 *                format: binary
 *              fbLink:
 *                type: string
 *                description: hospital's fbLink
 *              description:
 *                type: text
 *                description: hospital's description
 *     responses:
 *      200:
 *          description: Hospital created successfully
 *      500:
 *          description: Some Server Error
*/

HospitalRoutes.patch('/:id',CheckAuth.verificationToken,ImageUpload.image.single('image'),HospitalController.updateHospitalById);

/**
 * @swagger
 * /api/hospital/{id}:
 *   delete:
 *     summary: delete Hospital
 *     security:
 *       - jwt: []
 *     tags: [Hospital]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Hospital's id
 *     responses:
 *      200:
 *          description: Hospital deleted successfully
 *      500:
 *          description: Some Server Error
 */

HospitalRoutes.delete('/:id',CheckAuth.verificationToken,HospitalController.deleteHospitalById)

module.exports=HospitalRoutes