import Category from '../models/category.js';

export function create(req,res){
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