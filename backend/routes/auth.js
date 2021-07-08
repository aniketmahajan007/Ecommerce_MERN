import express from "express";
export const router = express.Router();
import {signup, signin, signout} from "../controller/auth.js";
import {userSignupvalidator} from "../validator/userSignupvalidator.js";

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

