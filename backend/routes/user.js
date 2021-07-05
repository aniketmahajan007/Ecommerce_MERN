import express from "express";
export const router = express.Router();
import {signup} from "../controller/user/signup.js";
import {userSignupvalidator} from "../validator/index.js";
import signin from "../controller/user/signin.js";
import signout from "../controller/user/signout.js";

router.post(`/signup`,async (req,res)=>{
    try{
        await userSignupvalidator(req.body)
            .then(()=>{
                //database
                signup(req,res);
            });
    }catch (e){
        res.status(400).json({
            'Error': e
        })
    }
});
router.post(`/signin`, signin);
router.get(`/signout`, signout);

