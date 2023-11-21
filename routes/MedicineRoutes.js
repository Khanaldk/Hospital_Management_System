const express=require('express');
const MedicineController = require('../controllers/MedicineController');
const validation = require('../middleware/validation');
const CheckAuth = require('../middleware/checkAuth');
const MedicineRoutes=express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      medicine:
 *        type: object
 *        required:
 *          - patientId
 *          - medicineName
 *        properties:
 *          patientId:
 *           type: integer
 *           description: User's patientId
 *          medicineName:
 *           type: string
 *           description: User's medicineName
 *         
 */

/**
 * @swagger
 * tags:
 *     name: Medicine
 *     description: The Medicine managing API endpoint
 */



/**
 * @swagger
 * /api/medicine:
 *   post:
 *     summary: Create new Medicine
 *     security:
 *       - jwt: []
 *     tags: [Medicine]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/medicine'    
 *     responses:
 *       200:
 *         description: Created Medicine successfully
 *       500:
 *         description: Some Server Error
 */

MedicineRoutes.post('/',CheckAuth.verificationToken,validation.medicineValidate,MedicineController.createMedicine);

/**
 * @swagger
 * /api/medicine:
 *   get:
 *     summary: List of all Medicine
 *     security:
 *       - jwt: []
 *     tags: [Medicine]
 *     responses:
 *      200:
 *          description: Medicine List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

MedicineRoutes.get('/',CheckAuth.verificationToken,MedicineController.getAllMedicine);

/**
 * @swagger
 * /api/medicine/{id}:
 *   get:
 *     summary: Retrieve Medicine
 *     security:
 *       - jwt: []
 *     tags: [Medicine]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Medicine's id
 *     responses:
 *      200:
 *          description: Medicine retrieved successfully
 *      500:
 *          description: Some Server Error
 */

MedicineRoutes.get('/:id',CheckAuth.verificationToken,MedicineController.getMedicineById);

/**
 * @swagger
 * /api/medicine/{id}:
 *   patch:
 *     summary: Update Medicine
 *     security:
 *       - jwt: []
 *     tags: [Medicine]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Medicine's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/medicine'
 *     responses:
 *      200:
 *          description: Medicine updated successfully
 *      500:
 *          description: Some Server Error
 */

MedicineRoutes.patch('/:id',CheckAuth.verificationToken,validation.medicineValidate,MedicineController.updateMedicineById);


/**
 * @swagger
 * /api/medicine/{id}:
 *   delete:
 *     summary: delete Medicine
 *     security:
 *       - jwt: []
 *     tags: [Medicine]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Medicine's id
 *     responses:
 *      200:
 *          description: Medicine deleted successfully
 *      500:
 *          description: Some Server Error
 */

MedicineRoutes.delete('/:id',CheckAuth.verificationToken,MedicineController.deleteMedicineById)

module.exports=MedicineRoutes