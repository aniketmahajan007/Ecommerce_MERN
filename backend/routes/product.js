import express from "express";
import {isAdmin, signin_checker} from "../controller/auth.js";
import {userById} from "../controller/user.js";
import {
    create,
    list_product,
    productById,
    read,
    removeProduct,
    updateProduct,
    related_product,
    listCategories,
    ListbySearch,
    product_photo
} from '../controller/product.js';

export const router = express.Router();

router.post('/product/create',signin_checker,userById,isAdmin,create);
router.get('/product/:productid',signin_checker,userById,isAdmin,productById,read);
router.delete('/product/:productid',signin_checker,userById,isAdmin,productById,removeProduct);
router.put('/product/:productid',signin_checker,userById,isAdmin,productById,updateProduct);

router.get('/product/',list_product);

router.get('/product/related/:productid',productById, related_product);

router.get('/product/categories',listCategories);

router.post('/products/by/search',ListbySearch);
router.get('/product/photo/:productid',productById, product_photo);