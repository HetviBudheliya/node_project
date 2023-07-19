const categorycrud = require('../models/categorySchema');
const subcatcrud = require('../models/subcategorySchema');

const subcategory = async(req,res)=>{
    try{
        let category = await categorycrud.find({});
        let subCategory = await subcatcrud.find({}).populate('categoryId');
        return res.render('admin/subCategory',{
            category,
            subCategory,
        });

    }catch(err){
        console.log(err);
        return false;
    }
}

const subcatAdd = async(req,res) =>{
    try{
        const {category,subcategory} = req.body;
        console.log(req.body);
        let addsubCategory = await subcatcrud.create({
            categoryId : category,
            subcategory : subcategory
        })
        if(addsubCategory){
            console.log("Subcategory is add");
            return res.redirect('back');
        }else{
            console.log("Subcategory isn't add");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    subcategory,
    subcatAdd
}