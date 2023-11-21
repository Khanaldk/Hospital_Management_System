const models=require('../models');
const {Patient,Disease,Medicine,Treatment,User}=require('../models');

const PatientController={};

PatientController.createPatient=async(req,res)=>{
        const patient={
            patientName:req.body.patientName,
            sex:req.body.sex,
            PhoneNo:req.body.PhoneNo
        }

        const newPatient=await Patient.create(patient);
        if(newPatient){
            return res.status(200).json({
                message:"Patient successfully admitted!",
                Patient:patient
            })
        }
}

PatientController.getAllPatient=async(req,res)=>{
    const patient=await Patient.findAll();
    if(patient){
        return res.status(200).json({
            message:"Patient successfully retrieved!",
            patients:patient
        })
    }
}

PatientController.getPatientById=async(req,res)=>{
    const id=req.params.id;
    const patient=await Patient.findAll({
        attributes:{
              exclude:['createdAt','updatedAt']
        },
        include:[
            {
                model:Disease,
                as:'diseases',
                attributes:['diseaseName']
            }
            ,
            {
                model:Treatment,
                as:'treatments',
                attributes:['treatmentName','doctorId','roomNo'],
                include:{
                    model:User,
                    as:'doctors',
                    attributes:['FirstName','LastName']
                }
            }
            ,
            {
                model:Medicine,
                as:'medicines',
                attributes:['medicineName']
            }
        ]
        ,where:{id:id}});
    if(patient){
        return res.status(200).json({
            message:"Patient details retrieved!",
            patient:patient
        })
    }
    return res.status(501).json({
        message:"Patient not found!"
    })
}

PatientController.updatePatientById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Patient.findOne({where:{id:id}});
    if(!checkId){
        return res.status(500).json({
            message:"Patient not found to update!"
        })
    }
    const updatePatient={
            patientName:req.body.patientName,
            sex:req.body.sex,
            PhoneNo:req.body.PhoneNo
    }
    const patientUpdated=await Patient.update(updatePatient,{where:{id:id}});
    if(patientUpdated){
        return res.status(200).json({
            message:"Patient updated successfully!",
            UpdatedPatient:updatePatient
        })
    }
}

PatientController.deletePatientById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Patient.findOne({where:{id:id}});
    if(!checkId)
    {
        return res.status(500).json({
            message:"Patient not found!"
        })
    }
    const deletePatient=await Patient.destroy({where:{id:id}});
    if(deletePatient){
        return res.status(200).json({
            message:"Patient deleted successfully!"
        })
    }
}



module.exports=PatientController