const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category :{
        type : String,
        required : true
    }   
});
const crud = mongoose.model('categorycrud',categorySchema);

module.exports = crud;