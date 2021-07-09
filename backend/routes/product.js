import express from "express";
import {isAdmin, signin_checker} from "../controller/auth.js";
import {userById} from "../controller/user.js";
import {create, productById, read, removeProduct, updateProduct} from '../controller/product.js';

export const router = express.Router();

router.post('/product/create',signin_checker,userById,isAdmin,create);
router.get('/product/:productid',signin_checker,userById,isAdmin,productById,read);
router.delete('/product/:productid',signin_checker,userById,isAdmin,productById,removeProduct);
router.put('/product/:productid',signin_checker,userById,isAdmin,productById,updateProduct);
