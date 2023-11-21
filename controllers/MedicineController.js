const models=require('../models');
const {Medicine}=require('../models');

const MedicineController={};

MedicineController.createMedicine=async(req,res)=>{
    const medicine={
        patientId:req.body.patientId,
        medicineName:req.body.medicineName
    }
    const newMedicine=await Medicine.create(medicine);
    if(newMedicine){
        return res.status(200).json({
            message:"Medicine created successfully!",
            Medicine:medicine
        })
    }
}

MedicineController.getAllMedicine=async(req,res)=>{
    const medicine=await Medicine.findAndCountAll();
    if(medicine){
        return res.status(200).json({
            message:"Medicine retrieved successfully!",
            Medicine:medicine
        })
    }
}

MedicineController.getMedicineById=async(req,res)=>{
    const id=req.params.id;
    const medicine=await Medicine.findOne({where:{id:id}});
    if(medicine){
        return res.status(200).json({
            message:"Medicine retrieved successfully!",
            Medicine:medicine
        })
    }
    return res.status(501).json({
        message:"Medicine not found!"
    })
}

MedicineController.updateMedicineById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Medicine.findOne({where:{id:id}});
    if(!checkId){
        return res.status(501).json({
            message:"Medicine not found to update!"
        })
    }
    const newMedicine={
        patientId:req.body.patientId,
        medicineName:req.body.medicineName
    }
    const updateMedicine=await Medicine.update(newMedicine,{where:{id:id}});
    if(updateMedicine){
        return res.status(200).json({
            message:"Medicine updated successfully!!",
            UpdatedMedicine:newMedicine
        })
    }
}

MedicineController.deleteMedicineById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Medicine.findOne({where:{id:id}});
    if(!checkId){
        return res.status(500).json({
            message:"Medicine not found to delete!"
        })
    }

    const deleteMedicine=await Medicine.destroy({where:{id:id}});
    if(deleteMedicine){
        return res.status(200).json({
            message:"Medicine deleted successfully!"
        })
    }
}

module.exports=MedicineController