const categorycrud = require('../models/categorySchema');

const category = async (req,res) =>{
    try{
        let categorydata = await categorycrud.find({});
        if(categorydata){
            return res.render('admin/category',{
                categorydata
            }) 
        }else{
            console.log("record not found");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
};

const categoryData = async (req,res) =>{
    try{
        const {category} = req.body
        console.log(req.body);
        let catdata = await categorycrud.create({
            category : category
        })
        if (catdata) {
            console.log("Catgory Successfully Add");
            return res.redirect('back');
        }
        else {
            console.log(err);
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
const deletecategory = async(req,res) =>{
    try{
        let id = req.query.id
        let dltCategory = await categorycrud.findByIdAndDelete(id);
        if(dltCategory){
            console.log("Category delete successfully");
            return res.redirect('back');
        }else{
            console.log("Category don't delete");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const subCategory = (req,res) =>{
    return res.render('admin/subCategory')
}

module.exports = {
    category,
    categoryData,
    deletecategory,
    subCategory
}