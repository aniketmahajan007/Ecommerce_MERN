import User from '../models/user.js';
import {userSignupvalidator} from "../validator/userSignupvalidator.js";

export function userById(req,res,next){
    User.findOne({_id:req._id}).exec((err,user)=>{
        if(err || !user) {
            return res.status(401).json({
                'Error': 'User does not exist'
            });
        }
        req.profile = user;
        next();
    });
}

export function user_profile(req,res){
    req.profile.salt = undefined;
    req.profile.hashed_pass = undefined;
    res.json(req.profile);
}

export function user_update(req,res){
    userSignupvalidator(req.body)
        .then(()=>{
            req.body._id = req.profile._id;
            User.findOneAndUpdate(
                {_id: req.profile._id},
                {$set: req.body},
                {new: true,useFindAndModify: false},
                (err, user)=>{
                    if(err || !user){
                        return res.status(401).json({
                            'Error': 'Unknown error occurred'
                        });
                    }
                    user.salt = undefined;
                    user.hashed_pass = undefined;
                    res.json(user);
                })
        })
        .catch((e)=>{
            res.status(400).json({
                'Error': e
            })
     });
}