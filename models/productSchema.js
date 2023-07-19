const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:'categorycrud',
    },
    subcategoryId:{
        type:mongoose.Types.ObjectId,
        ref : 'subcatgorycrud',
    },
    exsubcategoryId:{
        type:mongoose.Types.ObjectId,
        ref : 'exsubcatcrud',
    },
    name:{
        type:String,
        require:true
    },
    qty:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
});

const crud = mongoose.model('productCrud',productSchema);

module.exports = crud;