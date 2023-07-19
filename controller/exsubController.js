const categorycrud = require('../models/categorySchema');
const subcatcrud = require('../models/subcategorySchema');
const exsubcatcrud = require('../models/exsubcatSchema');

const exsubcategory = async(req,res)=>{
    try{
        let category = await categorycrud.find({});
        let subcategory = await subcatcrud.find({});
        let exsubcategory = await exsubcatcrud.find({}).populate('categoryId').populate('subcategoryId');
        return res.render('admin/exsubcategory',{
            category,
            subcategory,
            exsubcategory
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const exsubcatAdd = async (req,res)=>{
    try{
        const{category,subcategory,exsubcategory} = req.body;
        console.log(req.body);
        let exsubcatAdd = await exsubcatcrud.create({
            categoryId : category,
            subcategoryId : subcategory,
            exsubcategory : exsubcategory
        });
        if(exsubcatAdd){
            console.log("Ex Sub Category add");
            return res.redirect('back')
        }else{
            console.log("Ex Sub Category not add");
            return res.redirect('back')
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    exsubcategory,
    exsubcatAdd
}