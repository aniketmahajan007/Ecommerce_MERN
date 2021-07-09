import express from "express";
import {isAdmin, isAuth, signin_checker} from "../controller/auth.js";
import {user_profile, userById, user_update} from "../controller/user.js";

export const routers = express.Router();

routers.get('/secret/:userid',signin_checker,userById,isAdmin,(req,res)=>{
    res.status(200).json({
        user:req.profile
    });
});

routers.get('/user/:userid',signin_checker,isAuth,userById,user_profile)
routers.put('/user/:userid',signin_checker,isAuth,userById,user_update)