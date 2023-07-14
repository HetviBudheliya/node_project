const mongoose = require('mongoose');

const crudTbl = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }
});
const crud = mongoose.model('crud',crudTbl);

module.exports = crud;