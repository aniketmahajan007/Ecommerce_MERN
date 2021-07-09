import Product from '../models/product.js';
import formidable from 'formidable';
import fs from 'fs';
import errorHandler from "../helpers/dbErrorHandler.js";
import {Product_validator} from "../validator/Product_validator.js";
import _ from 'lodash';

export function create(req,res){
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=> {
        if(err){
            return res.status(400).json({
               error: 'Image could not be uploaded'
            });
        }
        Product_validator(fields,files)
            .then(()=>{
                let product = new Product(fields);
                if(files.photo){
                    product.photo.data = fs.readFileSync(files.photo.path);
                    product.photo.contentType = files.photo.type;
                }
                product.save((err, result) => {
                    if(err){
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }
                    result.photo = undefined;
                    res.json(result)
                });
            }).catch(e => {
                res.status(400).json({
                    error: e
                })
            })
    });
}

export function productById(req, res, next){
    Product.findById({_id: req.params.productid}).exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error: 'Product not found'
            });
        }
        req.product = product;
        next();
    })
}

export function read(req,res){
    req.product.photo = undefined;
    res.json(req.product);
}

export function removeProduct(req,res){
    Product.remove({_id:req.product._id},(err) => {
        if(err){
            return res.status(400).json({
                error: 'Database error occurred'
            })
        }
        res.json({
            'Status' : 'Product removed'
        })
    })
}

export function updateProduct(req,res){
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=> {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        Product_validator(fields,files)
            .then(()=>{
                let product = new Product(req.product);
                product = _.extend(product,fields);
                if(files.photo){
                    product.photo.data = fs.readFileSync(files.photo.path);
                    product.photo.contentType = files.photo.type;
                }
                product.save((err, result) => {
                    if(err){
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }
                    result.photo = undefined;
                    res.json(result)
                });
            }).catch(e => {
            res.status(400).json({
                error: e
            })
        })
    });
}

export function list_product(req,res){
    const order = req.query.order ? req.query.order : 'asc';
    const sortby = req.query.sortby ? req.query.sortby : '_id';
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    // Validation
    if(order ==="asc" || order === "desc"){}else{
        return res.status(400).json({
            error:'Bad Request'
        })
    }
    if(sortby === "createdAt" || sortby === "_id"){}else{
        return res.status(400).json({
            error:'Bad Request'
        })
    }
    if(limit<1 || limit > 50){
        return res.status(400).json({
            error:'Bad Request'
        })
    }
    // Get data
    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortby,order]])
        .limit(limit)
        .exec((err, result) => {
            if(err || !result){
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            res.json(result);
        })
}

export function related_product(req,res){
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    if(limit<1 || limit > 50){
        return res.status(400).json({
            error:'Bad Request'
        })
    }
    Product.find({_id:{$ne: req.product}, category: req.product.category})
        .limit(limit)
        .select('-photo')
        .populate('category','_id name')
        .exec((err,result) => {
            if(err || !result){
                return res.status(400).json({
                    error:'Product not found'
                })
            }
            res.json(result);
        });
}

export function listCategories(req,res){
    Product.distinct('category',{},(err,result) => {
        if(err || !result){
            return res.status(400).json({
                error:'Product not found'
            })
        }
        res.json(result);
    });
}

export function ListbySearch (req,res){
    const order = req.body.order ? req.body.order : "desc";
    const sortby = req.body.sortby ? req.body.sortby : "_id";
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const skip = parseInt(req.body.skip);
    const findArgs = {};
    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === "price"){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                }
            }else{
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortby,order]])
        .skip(skip)
        .limit(limit)
        .exec((err,result) => {
            if(err || !result){
                return res.status(400).json({
                    error:'Product not found'
                })
            }
            res.json({
                size: result.length,
                data: result
            })
        });
}

export function product_photo(req,res,next){
    if(req.product.photo.data){
        res.set('Content-type',req.product.photo.contentType);
        return res.send(req.product.photo.data);
        next();
    }else{
        return res.status(400).json({
            error:'Product not found'
        });
    }
}