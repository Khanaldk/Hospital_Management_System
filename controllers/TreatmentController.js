const models=require('../models');
const {Treatment,Patient,User}=require('../models');

const TreatmentController={};

TreatmentController.createTreatment=async(req,res)=>{
    const treatment={
        treatmentName:req.body.treatmentName,
        patientId:req.body.patientId,
        doctorId:req.body.doctorId,
        roomNo:req.body.roomNo
    }
    const newTreatment=await Treatment.create(treatment);
    if(newTreatment){
        return res.status(200).json({
            message:"Treatment created successfully!",
            treatment:treatment
        })
    }
}

TreatmentController.getAllTreatment=async(req,res)=>{
    const treatment=await Treatment.findAll();
    if(treatment){
        return res.status(200).json({
            message:"Treatment retrieved successfully!",
            treatment:treatment
        })
    }
}

TreatmentController.getTreatmentById=async(req,res)=>{
    const id=req.params.id;
    const treatment=await Treatment.findAll({
        attributes:{
            exclude:['createdAt','updatedAt']
        }
        ,
        include:[
            {
                model:Patient,
                as:'patients',
                attributes:['patientName','sex','PhoneNo']
            }
            ,
            {
                model:User,
                as:'doctors',
                attributes:['FirstName','LastName']
            }
        ]
        
        ,where:{patientId:id}});
    if(treatment){
        return res.status(200).json({
            message:"Treatment retrieved successfully!",
            treatment:treatment
        })
    }
    return res.status(501).json({
        message:"Treatment not found!"
    })
}

TreatmentController.updateTreatmentById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Treatment.findOne({where:{id:id}});
    if(!checkId){
        return res.status(200).json({
            message:"Treatment not found to update!"
        })
    }
    const changeTreatment={
        treatmentName:req.body.treatmentName,
        patientId:req.body.patientId,
        doctorId:req.body.doctorId,
        roomNo:req.body.roomNo
    }
    const updateTreatment=await Treatment.update(changeTreatment,{where:{id:id}});
    if(updateTreatment){
        return res.status(200).json({
            message:"Treatment updated successfully!",
            updatedTreatment:changeTreatment
        })
    }
}

TreatmentController.deleteTreatmentById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Treatment.findOne({where:{id:id}});
    if(!checkId){
        return res.status(502).json({
            message:"Treatment not found!"
        })
    }
    const deleteTreatment=await Treatment.destroy({where:{id:id}});
    if(deleteTreatment){
        return res.status(200).json({
            message:"Treatment deleted successfully!!"
        })
    }
}



module.exports=TreatmentController