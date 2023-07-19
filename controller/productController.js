const categorycrud = require('../models/categorySchema');
const subcatcrud = require('../models/subcategorySchema');
const exsubcatcrud = require('../models/exsubcatSchema');
const productCrud = require('../models/productSchema');

const product = async (req,res) => {
    try{
        let category = await categorycrud.find({});
        let subcategory = await subcatcrud.find({});
        let exsubcategory = await exsubcatcrud.find({});
        let product = await productCrud.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');
        return res.render('admin/product',{
            category,
            subcategory,
            exsubcategory,
            product
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const addproduct = async (req,res)=>{
    try{
        const{category,subcategory,exsubcategory,name,qty,price,description}=req.body;
        console.log(req.body);
        let productdata = await productCrud.create({
            categoryId : category,
            subcategoryId : subcategory,
            exsubcategoryId : exsubcategory,
            name:name,
            qty:qty,
            price:price,
            description:description
        })
        if(productdata){
            console.log("Product add");
            return res.redirect('/productview');
        }else{
            console.log("Product not add");
            return res.redirect('back')
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const poductview = async (req,res)=>{
    try{
        let category = await categorycrud.find({});
        let subcategory = await subcatcrud.find({});
        let exsubcategory = await exsubcatcrud.find({});
        let productdata = await productCrud.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');
        if(productdata){
            return res.render('admin/productview',{
                productdata,
                category,
                subcategory,
                exsubcategory
            });
        }else{
            console.log("Record not fetch");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    product,
    addproduct,
    poductview
}
