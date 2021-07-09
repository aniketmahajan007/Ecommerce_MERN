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
    console.log('update process begin:');
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
                console.log(product);
                product = _.extend(product,fields);
                console.log(product);
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