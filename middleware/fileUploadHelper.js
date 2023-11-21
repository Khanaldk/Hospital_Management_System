const multer=require('multer');

const imageFilter=async(req,file,cb)=>{
    if(file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)){
        cb(null,true)
    }else{
        cb(new Error('Image type not supported!',false))
    }
}

const storage=multer.diskStorage({
    destination:async(req,file,cb)=>{
        cb(null,'./upload')
    },
    filename:async(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const ImageUpload={};

ImageUpload.image=multer({
    fileFilter:imageFilter,
    storage,
    limits:{
        fileSize:1024*1024*1024
    }
})

module.exports=ImageUpload