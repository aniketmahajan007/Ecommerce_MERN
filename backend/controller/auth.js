import User from "../models/user.js";
import {config} from "dotenv";
import jwt from "jsonwebtoken";
import errorHandler from "../helpers/dbErrorHandler.js";

export function signin(req,res){
    const {email, password} = req.body;
    User.findOne({email},(err, user)=>{
        console.log(config().parsed.JWT_SECRET);
        if(err || !user){
            res.status(400).json({
                'Error':'User does not exist'
            });
            return;
        }
        // Authentication
        if(!user.authenticate(password)){
            res.status(401).json({
                'Error':'Email and password does not match'
            });
            return;
        }
        // Generating token
        const token = jwt.sign({id: user.id},config().parsed.JWT_SECRET);
        res.cookie('token',token,{expire: new Date() + 9999});
        res.status(200).json({
            token,
            user: {
                id: user.id,
                email,
                name:user.name,
                role: user.role
            }
        });
        return;
    });
}

export function signout(req, res){
    res.clearCookie('token');
    res.status(200).json({
        'Status': 'Successfully Sign out'
    });
}

export function signup(req,res){
    const result = new User(req.body);
    result.save((err,result)=>{
        if(err){
            res.status(400).json(errorHandler(err));
        }else{
            result.hashed_pass = undefined;
            result.salt = undefined;
            res.status(200).json(result);
        }
    });
}

export function signin_checker(req,res,next){
    try {
        const result = jwt.verify(req.cookies.token, config().parsed.JWT_SECRET);
        req._id = result.id;
        next();
    }catch (e){
        return res.status(403).json({
            error: 'Token Expired'
        });
    }
}

export function isAuth (req,res,next){
    if(req.params.userid !== req._id){
        return res.status(403).json({
           error: 'Access Denied'
        });
    }
    next();
}

export function isAdmin(req,res,next){
    if(!req.profile.role){
        return res.status(403).json({
           error: 'You do not have privilege to access data'
        });
    }
    next();
}