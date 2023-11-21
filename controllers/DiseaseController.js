const models=require('../models');
const {Disease}=require('../models');

const DiseaseController={};

DiseaseController.createDisease=async(req,res)=>{
    const disease={
        patientId:req.body.patientId,
        diseaseName:req.body.diseaseName
    }
    const newDisease=await Disease.create(disease);
    if(newDisease){
        return res.status(200).json({
            message:"Disease created successfully!!",
            Disease:disease
        })
    }
}

DiseaseController.getAllDisease=async(req,res)=>{
    const disease=await Disease.findAll();
    if(disease){
        return res.status(200).json({
            message:"Disease retrieved successfully!!",
            Diseases:disease
        })
    }
}

DiseaseController.getDiseaseById=async(req,res)=>{
    const id=req.params.id;
    const disease=await Disease.findOne({where:{id:id}});
    if(disease){
        return res.status(200).json({
            message:"Disease retrieved successfully!",
            Disease:disease
        })
    }
    return res.status(500).json({
        message:"Disease not found!"
    })
}

DiseaseController.updateDiseaseById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Disease.findOne({where:{id:id}});
    if(!checkId){
        return res.status(500).json({
            message:"Disease not found to update!"
        })
    }

    const newDisease={
        patientId:req.body.patientId,
        diseaseName:req.body.diseaseName
    }
    const updateDisease=await Disease.update(newDisease,{where:{id:id}});
    if(updateDisease){
        return res.status(200).json({
            message:"Disease updated successfully!",
            UpdatedDisease:newDisease
        })
    }
}

DiseaseController.deletePatientById=async(req,res)=>{
    const id=req.params.id;
    const disease=await Disease.destroy({where:{id:id}});
    if(disease){
        return res.status(200).json({
            message:"Disease deleted successfully!"
        })
    }
    return res.status(500).json({
        message:"Disease not found!"
    })
}

module.exports=DiseaseController