const mongoose = require('mongoose');

const exsubcatSchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:'categorycrud',
    },
    subcategoryId:{
        type:mongoose.Types.ObjectId,
        ref : 'subcatgorycrud',
    },
    exsubcategory:{
        type:String,
        require:true
    }
})

const crud = mongoose.model('exsubcatcrud',exsubcatSchema);
module.exports = crud;