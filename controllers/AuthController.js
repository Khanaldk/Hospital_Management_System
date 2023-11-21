const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const models=require('../models');
const {User}=require('../models');

const AuthController={};

AuthController.login=async(req,res)=>{
    const {Email,Password}=req.body;
    if(!Email || !Password){
        return res.status(502).json({
            message:"All field are required!"
        })
    }
    const userData=await User.findOne({where:{Email:Email}});
    if(!userData){
        return res.status(500).json({
            message:"You arenot a registered user!"
        })
    }
    const checkPassword=await bcrypt.compare(Password,userData.Password)
    if(userData.Email==Email && checkPassword){
        const token=await jwt.sign({id:userData.id},process.env.JWT_SECRET_TOKEN,{expiresIn:'2d'})
        if(token){
            return res.status(200).json({
                message:"Login Successfully!",
                token:token
            })
        }
    }
    return res.status(502).json({
        message:"Invalid Email or Password!"
    })   
}


module.exports=AuthController