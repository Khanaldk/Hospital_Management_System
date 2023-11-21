const models=require('../models');
const {Cashier,Hospital,Treatment,User,Patient}=require('../models');

const CashierController={};

CashierController.createCashier=async(req,res)=>{
    const cash={
        hospitalId: req.body.hospitalId,
        treatmentId: req.body.treatmentId,
        totalCost: req.body.totalCost
    }
    const createCashier=await Cashier.create(cash);
    if(createCashier){
        return res.status(200).json({
            message:"Cashier created successfully!",
            Cashier:createCashier
        })
    }
}

CashierController.getAllCashier=async(req,res)=>{
    const cashier=await Cashier.findAll();
    if(cashier){
        return res.status(200).json({
            message:"Cashier retrieved successfully!",
            Cashier:cashier
        })
    }
}

CashierController.getCashierById=async(req,res)=>{
    const id=req.params.id;
    const cashier=await Cashier.findOne({
        attributes:{
            exclude:['createdAt','updatedAt']
        },
        include:[{
            model:Hospital,
            as:'hospitals',
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        }  
        ,
        {
            model:Treatment,
            as:'treatments',
            attributes:{
                exclude:['id','createdAt','updatedAt']
            },
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
        }    
      ]
        ,where:{id:id}});
    if(cashier){
        return res.status(200).json({
            message:"Cashier retrieved successfully!",
            Cashier:cashier
        })
    }
    return res.status(500).json({
        message:"Cashier not found!"
    })
}

CashierController.updateCashierById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Cashier.findOne({where:{id:id}});
    if(!checkId){
        return res.status(500).json({
            message:"Cashier not found!"
        })
    }
    const newCashier={
        hospitalId: req.body.hospitalId,
        treatmentId: req.body.treatmentId,
        totalCost: req.body.totalCost
    }
    const updateCashier=await Cashier.update(newCashier,{where:{id:id}});
    if(updateCashier){
        return res.status(200).json({
            message:"Cashier updated successfully!",
            Cashier:newCashier
        })
    }
}

CashierController.deleteCashierById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await Cashier.findOne({where:{id:id}});
    if(!checkId){
        return res.status(500).json({
            message:"Cashier not found!"
        })
    }
    const deleteCashier=await Cashier.destroy({where:{id:id}});
    if(deleteCashier){
        return res.status(200).json({
            message:"Cashier deleted successfully!"
        })
    }
}

module.exports=CashierController