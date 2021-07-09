import express from "express";
import {categoryById, create, category_read, list_category, update_category, delete_category} from "../controller/category.js";
import {isAdmin, signin_checker} from "../controller/auth.js";
import {userById} from "../controller/user.js";

export const router = express.Router();

router.post('/category/create',signin_checker,userById,isAdmin,create);

router.get('/category/:categoryid',signin_checker,userById,isAdmin,categoryById,category_read);

router.put('/category/:categoryid',signin_checker,userById,isAdmin,categoryById, update_category);

router.delete('/category/:categoryid',signin_checker,userById,isAdmin,categoryById, delete_category);

router.get('/categories',signin_checker,userById,isAdmin, list_category);