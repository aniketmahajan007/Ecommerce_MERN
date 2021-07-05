import User from '../../models/user.js';
import errorHandler from "../../helpers/dbErrorHandler.js";

export function  signup(req,res){
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