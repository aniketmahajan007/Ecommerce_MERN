import User from '../models/user.js';

export function signup(req,res){
    const result = new User(req.body);
    result.save((err,result)=>{
        if(err){
            res.send('Error occurred: '+err);
        }else{
            res.send(result);
        }
    });
}