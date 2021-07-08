import express from "express";
import {create} from "../controller/category.js";
import {isAdmin, signin_checker} from "../controller/auth.js";
import {userById} from "../controller/user.js";

export const router = express.Router();

router.post('/category/create',signin_checker,userById,isAdmin,create);
