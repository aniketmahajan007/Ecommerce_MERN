import Category from '../models/category.js';

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