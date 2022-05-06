const mongoose = require('mongoose');

const Datas = new mongoose.Schema({
    firstname:{
        type:String,
        required:true      
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    employeeId:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Datas",Datas);
