const mongoose = require('mongoose');

const subcatSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'categorycrud'
    },
    subcategory : {
        type : String,
        required : true
    }
});

const crud = mongoose.model('subcatgorycrud',subcatSchema);
module.exports = crud;