const blogCrud = require("../models/blogSchema");

const fs = require('fs');

// add blog start
const addBlog = (req,res) => {
    return res.render('admin/addblog',{
        single: ""
    })
}

// insert data start
const insertBlogData = async (req,res) =>{
    try{
        const {editid,title, description} = req.body;
        console.log(req.body);
        if(editid){
            if(req.file){
                if(!title || !description){
                    console.log("Enter all fild");
                    return res.redirect('/');
                }
                // delete blog img
                let deleteImg = await blogCrud.findById(editid)
                if(deleteImg){
                    fs.unlinkSync(deleteImg.image)
                }else{
                    console.log("Image not deleted");
                    return false;
                }
                // update blog img
                let image = ""
                if(req.file){
                    image = req.file.path
                }
                let updateBlogData = await blogCrud.findByIdAndUpdate(editid,{
                    title : title,
                    description : description,
                    image : image
                })
                if(updateBlogData){
                    console.log("Blog Data Is Edit");
                    return res.redirect('/viewBlogData')
                }else{
                    console.log("Blog not edited");
                    return false;
                }
            }else{
                image = "";
                let singleData = await blogCrud.findById(editid);
                if(!title || !description){
                    console.log("Blog is edit");
                    return req.redirect('back');
                }
                if(singleData){
                    let updateData = await blogCrud.findByIdAndUpdate(editid,{
                        title : title,
                        description : description,
                        image : image
                    })
                    if(updateData){
                        console.log("Edit Blog");
                        return res.redirect('/viewBlogData');
                    }else{
                        console.log("Not Edit Blog");
                        return false;
                    }
                }
            }
            
        }else{
            let image = "";
            if (req.file) {
                image = req.file.path
            }
            if(!title || !description || !image){
                console.log("Enter all fild");
                return res.redirect('/addblog');
            }
            let data = await blogCrud.create({
                title : title,
                description : description,
                image : image
            })
            if(data){
                console.log(req.body);
                console.log("Blog Successfully Add");
                return res.redirect('/viewBlogData');
            }else{
                console.log(err);
                return res.redirect('back');
            }
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
// insert data end

// view blog start
const viewBlogData = async(req,res) =>{
    try{
        let blogData = await blogCrud.find({});
        if(blogData){
            return res.render('admin/viewblog',{
                blogData
            })
        }else{
            console.log("Blog not found");
            return false;
        }
    }catch(err){
        if(err){
            console.log(err);
            return false;
        }
    }
}
// view blog end

// delete blog start
const deleteBlogData = async (req,res) =>{
    try{
        let id = req.query.id
        // delete img
        let deleteImg = await blogCrud.findById(id)
        if(deleteImg){
            fs.unlinkSync(deleteImg.image);
        }else{
            console.log("image not deleted");
            return false;
        }
        // delete blog
        let deleteBlog = await blogCrud.findByIdAndDelete(id);
        if(deleteBlog){
            console.log("Blog Is Deleted Successfully");
            return res.redirect('back');
        }else{
            console.log("Blog Is Not Deleted");
            return res.redirect('back')
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
// delete blog end

// edit blog start
const editBlogData = async(req,res) =>{
    try{
        let id = req.query.id
        let single = await blogCrud.findById(id);
        if(single){
            return res.render('admin/addblog',{
                single
            })
        }else{
            console.log("Record Not Found");
            return false
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
// edit blog end

// add blog end


module.exports = {
    addBlog,
    insertBlogData,
    viewBlogData,
    deleteBlogData,
    editBlogData
}