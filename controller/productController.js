const categorycrud = require('../models/categorySchema');
const subcatcrud = require('../models/subcategorySchema');
const exsubcatcrud = require('../models/exsubcatSchema');
const productCrud = require('../models/productSchema');
const fs = require('fs');

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


        // Product add
        let image = "";
        if (req.file) {
            image = req.file.path
        }
        let productdata = await productCrud.create({
            categoryId : category,
            subcategoryId : subcategory,
            exsubcategoryId : exsubcategory,
            name:name,
            qty:qty,
            price:price,
            description:description,
            image : image
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

// product view
const productview = async (req,res)=>{
    try{
        let category = await categorycrud.find({});
        let subcategory = await subcatcrud.find({});
        let exsubcategory = await exsubcatcrud.find({});
        let productdata = await productCrud.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');
        if(productdata){
            return res.render('admin/productview',{
                category,
                subcategory,
                exsubcategory,
                productdata
            })
        }else{
            console.log("Record not fetch");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

// product delete 

const deleteProduct = async(req,res) =>{
    try{
        let id = req.query.id;
        let dltproduct = await productCrud.findByIdAndDelete(id);
        if(dltproduct){
            console.log("Product is Deleted");
            return res.redirect('back');
        }else{
            console.log("Product isn't Deleted");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}


module.exports = {
    product,
    addproduct,
    productview,
    deleteProduct,
}