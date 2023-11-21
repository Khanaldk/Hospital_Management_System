const {check,validationResult}=require('express-validator');

const models=require('../models');

const {User,Patient,Hospital,Treatment}=require('../models');

const validation={};

validation.UserValidate=[
    check('FirstName')
        .notEmpty().withMessage("FirstName is required!")
        .isString().withMessage("FirstName must be string!")
        .isAlpha().withMessage("FirstName must be in alphabet!")
        .isLength({min:3}).withMessage("FirstName must be at least 3 character!")
        ,
    check('LastName')
        .notEmpty().withMessage("LastName is required!")
        .isString().withMessage("LastName must be string!")
        .isAlpha().withMessage("LastName must be in alphabet!")
        .isLength({min:3}).withMessage("LastName must be at least 3 character!")
        ,
    check('Email')
        .notEmpty().withMessage("Email is required!")
        .isEmail().withMessage("Email is invalid!")
        ,
    check('Password')
        .notEmpty().withMessage('Password is required!')
        .isLength({min:8}).withMessage("Password must be at least 8 character!")
        ,
    check('Gender')
        .notEmpty().withMessage("Gender is required!")
        .isIn(['male','female','other']).withMessage("Gender must be either male,female or other")
        ,
    check('Address')
        .notEmpty().withMessage("Address is required!")
        .isString().withMessage("Address must be in string!")
        ,
    check('PhoneNo')
        .notEmpty().withMessage("PhoneNumber is required!")
        .isMobilePhone().withMessage("PhoneNumber is invalid!")
        .custom(async(value)=>{
            const checkPhoneNo=await Patient.findOne({where:{PhoneNo:value}});
            if(checkPhoneNo){
                throw Error("PhoneNo already exist!")
            }
        })
        ,
    check('UserStatus')
        .notEmpty().withMessage("Userstatus is required!")
        .isIn(['doctor','staff','manager']).withMessage("UserStatus must be in either doctor,staff or manager!")
        ,
        (req,res,next)=>{
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({
                    errors:errors.array()
                })
            }
            return next();
        }
]

validation.patientValidate=[
    check('patientName')
        .notEmpty().withMessage("PatientName is required!")
        .isLength({min:3}).withMessage("Name must be at least 3 character!")
        ,
    check('sex')
        .notEmpty().withMessage("Sex is required!")
        .isIn(['male','female','other']).withMessage('Sex must be either in male,female or other!')
        ,
    check('PhoneNo')
        .notEmpty().withMessage("PhoneNumber is required!")
        .isMobilePhone().withMessage("PhoneNumber is invalid!")
        .custom(async(value)=>{
            const checkPhoneNo=await User.findOne({where:{PhoneNo:value}});
            if(checkPhoneNo){
                throw Error('PhoneNo already exist!')
            }
        })
        ,
        (req,res,next)=>{
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({
                    errors:errors.array()
                })
            }
            return next();
        }
]

validation.diseaseValidate=[
    check('patientId')
        .notEmpty().withMessage("PatientId is required!")
        .isInt().withMessage('PatientId must be integer!')
        .custom(async(value)=>{
            const checkId=await Patient.findOne({where:{id:value}});
            if(!checkId){
                throw Error('PatientId is invalid!')
            }
        })
        ,
    check('diseaseName')
        .notEmpty().withMessage("DiseaseName is required!")
        .isLength({min:3}).withMessage("DiseaseName must be at least 3 character!")
        ,
        (req,res,next)=>{
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({
                    errors:errors.array()
                })
            }
            return next();
        }
]

validation.medicineValidate=[
    check('patientId')
        .notEmpty().withMessage("PatientId is required!")
        .isInt().withMessage('PatientId must be integer!')
        .custom(async(value)=>{
            const checkId=await Patient.findOne({where:{id:value}});
            if(!checkId){
                throw Error('PatientId is invalid!')
            }
        })
        ,
        check('medicineName')
        .notEmpty().withMessage("medicineName is required!")
        .isLength({min:3}).withMessage("medicineName must be at least 3 character!")
        ,
        (req,res,next)=>{
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({
                    errors:errors.array()
                })
            }
            return next();
        }
]

validation.treatmentValidate=[
    check('treatmentName')
        .notEmpty().withMessage("TreatmentName is required!")
        .isLength({min:3}).withMessage('TreatmentName must be at least 3 character!')
        ,
    check('patientId')
        .notEmpty().withMessage("PatientId is required!")
        .isInt().withMessage('PatientId must be integer!')
        .custom(async(value)=>{
            const checkId=await Patient.findOne({where:{id:value}});
            if(!checkId){
                throw Error('PatientId is invalid!')
            }
        })
        ,
    check('doctorId')
        .notEmpty().withMessage("DoctorId is required!")
        .isInt().withMessage("DoctorId must be integer!")
        .custom(async(value)=>{
            const checkId=await User.findOne({where:{id:value}});
            if(!checkId){
                throw Error('DoctorId is invalid!')
            }
        })
        ,
    check('roomNo')
        .notEmpty().withMessage("RoomNo is required!")
        .isInt().withMessage('RoomNo must be integer!')
        ,
        (req,res,next)=>{
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({
                    errors:errors.array()
                })
            }
            return next();
        }
]

validation.hospitalValidate=[
    check('hospitalName')
        .notEmpty().withMessage('HospitalName is required!')
        .isLength({min:3}).withMessage("HospitalName must be at least 3 character")
        ,
    check('hospitalAddress')
        .notEmpty().withMessage('hospitalAddress is required!')
        .isLength({min:3}).withMessage("hospitalAddress must be at least 3 character")
        ,
    check('fbLink')
        .notEmpty().withMessage('fbLink is required!')
        ,
    check('description')
        .notEmpty().withMessage('description is required!')
        ,
        (req,res,next)=>{
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({
                    errors:errors.array()
                })
            }
            return next();
        }
]

validation.cashierValidate=[
    check('hospitalId')
        .notEmpty().withMessage("hospitalId is required!")
        .isInt().withMessage('hospitalId must be integer!')
        .custom(async(value)=>{
            const checkId=await Hospital.findOne({where:{id:value}}); 
            if(!checkId){
                throw Error('hospitalId is invalid!')
            }
        })
        ,
    check('treatmentId')
        .notEmpty().withMessage("treatmentId is required!")
        .isInt().withMessage('treatmentId must be integer!')
        .custom(async(value)=>{
            const checkId=await Treatment.findOne({where:{id:value}});
            if(!checkId){
                throw Error('treatmentId is invalid!')
            }
        }),
    check('totalCost')
        .notEmpty().withMessage("Cost is required!")
        .isInt().withMessage("Cost must be in integer")
            ,
        (req,res,next)=>{
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({
                    errors:errors.array()
                })
            }
            return next();
         }

]

module.exports=validation