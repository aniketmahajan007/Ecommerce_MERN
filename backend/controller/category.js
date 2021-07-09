import Category from '../models/category.js';
import _ from 'lodash';

export function create(req,res){
    if(req.body.name === undefined || req.body.name.length < 3){
        return res.status(400).json({
            error: 'Please fill all the fields properly'
        });
    }
    const result = new Category(req.body);
    result.save((err,data)=>{
        if(err){
            return res.status(400).json({
               'Error':'Database error occurred'
            });
        }
        res.json(data)
    })
}
export function categoryById(req,res,next){
    Category.findOne({_id:req.params.categoryid}).exec((err,category)=>{
        if(err || !category) {
            return res.status(401).json({
                'Error': 'Category does not exist'
            });
        }
        req.category = category;
        next();
    });
}

export function category_read(req,res){
    res.json(req.category)
}

export function update_category(req,res){
    if(req.body.name === undefined || req.body.name.length < 3){
        return res.status(400).json({
            error: 'Please fill all the fields properly'
        });
    }
    req.category.name = req.body.name;
    let cat_res = new Category(req.category);
    cat_res.save((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: 'Database error occurred'
            });
        }
        res.json(category)
    })

}

export function delete_category(req,res){
    let category = new Category(req.category);
    category.remove((err) =>{
        if(err){
            return res.status(400).json({
                error: 'Database error occurred'
            });
        }
        res.json({
            'Status': 'Successfully removed'
        });
    })
}

export function list_category(req,res){
    Category.find().exec((err, result) => {
        if(err || !result){
            res.status(400).json({
               error:'Database error occurred'
            });
        }
        res.json(result);
    })
}
