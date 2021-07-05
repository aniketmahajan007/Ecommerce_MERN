import jwt from 'jsonwebtoken';
import {config} from "dotenv";
import User from '../../models/user.js';

export default function signin(req,res){
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