const { check } = require("express-validator");
const models=require("../models");
const {Hospital}=require("../models");
const hospital = require("../models/hospital");

const HospitalController={};

HospitalController.createHospital=async(req,res,)=>{
    if(!req.file){
        return res.status(400).json({
            message:"First select the image!"
        })
    }
    const hospital={
        hospitalName:req.body.hospitalName,
        hospitalAddress:req.body.hospitalAddress,
        fbLink:req.body.fbLink,
        description:req.body.description,
        imageUrl: req.file.path
    }
    const createHospital=await Hospital.create(hospital);
    if(createHospital){
        return res.status(200).json({
            message:"Hospital created Successfully!",
            Hospital:hospital
        })
    }
}

HospitalController.getAllHospital=async(req,res)=>{
    const hospital=await Hospital.findAll();
    if(hospital){
        return res.status(200).json({
            message:"Hospital retrieved successfully!",
            Hospital:hospital
        })
    }
}

HospitalController.getHospitalById=async(req,res)=>{
    const id=req.params.id;
    const hospital=await Hospital.findOne({where:{id:id}});
    if(hospital){
        return res.status(200).json({
            message:"Hospital retrieved successfully!",
            Hospital:hospital
        })
    }
    return res.status(500).json({
        message:"Hospital Not found!"
    })
}

HospitalController.updateHospitalById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Hospital.findOne({where:{id:id}});
    if(!checkId || !req.file){
        return res.status(500).json({
            message:"Hospital Not Found or File not selected!!"
        })
    }
    const updateHospital={
        hospitalName:req.body.hospitalName,
        hospitalAddress:req.body.hospitalAddress,
        fbLink:req.body.fbLink,
        description:req.body.description,
        imageUrl:req.file.path
    }
    const NewHospitalUpdate=await Hospital.update(updateHospital,{where:{id:id}});
    if(NewHospitalUpdate){
        return res.status(200).json({
            message:"Hospital Updated Successfully!",
            updateHospital:updateHospital
        })
    }
}

HospitalController.deleteHospitalById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Hospital.findOne({where:{id:id}});
    if(!checkId){
        return res.status(501).json({
            message:"Hospital Not Found!"
        })
    }
    const deleteHospital=await Hospital.destroy({where:{id:id}});
    if(deleteHospital){
        return res.status(200).json({
            message:"Hospital deleted Successfully!"
        })
    }
}

module.exports=HospitalController