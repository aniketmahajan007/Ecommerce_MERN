import mongoose from 'mongoose';
import crypto from 'crypto';
import { v1 as uuid } from 'uuid';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 40
    },
    email: {
        type: String,
        trim:true,
        maxlength: 40,
        unique:true,
        required: true
    },
    hashed_pass: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
},{timestamps: true}
);

// Virtual Field

userSchema.virtual('password')
    .set(function (pass){
        this.salt = uuid();
        this.hashed_pass = this.encrypt_pass(pass);
    }).get(function (){
        return this.hashed_pass;
});

userSchema.methods = {
    authenticate: function (text){
        return this.encrypt_pass(text) === this.hashed_pass
    },
    encrypt_pass:  function encrypt_pass(pass) {
        if(!pass){ return '';}
        try{
            return crypto.createHmac('sha1',this.salt).
            update(pass).digest('hex');
        }catch (e) {
            return '';
        }
    }
}


export default mongoose.model('user',userSchema);