const models=require('../models');

const {User}=require('../models');
const bcrypt=require('bcrypt');

const UserController={};

UserController.createUser=async(req,res)=>{
    const HashPassword=await bcrypt.hash(req.body.Password,10);
    const userDetails={
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Email:req.body.Email,
        Password:HashPassword,
        Gender:req.body.Gender,
        Address:req.body.Address,
        PhoneNo:req.body.PhoneNo,
        UserStatus:req.body.UserStatus
    }

    const newUser=await User.create(userDetails);
    if(newUser){
        res.status(200).json({
            message:"User created Successfully!!",
            User:userDetails
        })
    }
}

UserController.getAllUser=async(req,res)=>{
    const userDetails=await User.findAll();
    if(userDetails){
        return res.status(200).json({
            message:"Successfully retrieved Users!",
            Users:userDetails
        })
    }
}

UserController.getUserById=async(req,res)=>{
    const id=req.params.id;
    const userDetail=await User.findOne({where:{id:id}});
    if(userDetail){
        return res.status(200).json({
            message:"Successfully retrieved User!",
            User:userDetail
        })
    }
    return res.status(500).json({
        message:"User not found!"
    })
}

UserController.updateUserById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await User.findOne({where:{id:id}});
    if(!checkId){
        return res.status(500).json({
            message:"User not found!"
        })
    }
    const newUser={
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Email:req.body.Email,
        Password:req.body.Password,
        Gender:req.body.Gender,
        Address:req.body.Address,
        PhoneNo:req.body.PhoneNo,
        UserStatus:req.body.UserStatus

    }
    const userDetails=await User.update(newUser,{where:{id:id}});
    if(userDetails){
        return res.status(200).json({
            message:"User updated successfully!",
            User:newUser
        })
    }
}

UserController.deleteUserById=async(req,res)=>{
    const id=req.params.id;
    const checkId=await User.findOne({where:{id:id}});
    if(!checkId){
        return res.status(500).json({
            message:"User not found!"
        })
    }

    const deleteUser=await User.destroy({where:{id:id}});
    if(deleteUser){
        return res.status(200).json({
            message:"User deleted successfully!"
        })
    }
}






module.exports=UserController