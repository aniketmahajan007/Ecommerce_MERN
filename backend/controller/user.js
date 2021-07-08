import User from '../models/user.js';

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