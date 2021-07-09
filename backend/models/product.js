import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 40
        },
        description:{
            type:String,
            required:true,
            maxlength:2000
        },
        price: {
            type: Number,
            trim:true,
            required:true,
            maxlength:32
        },
        category:{
            type:ObjectId,
            ref: 'category',
            required: true
        },
        quantity: {
            type:Number,
            required: true
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
            required: false,
            type: Boolean
        }
    },{timestamps: true}
);


export default mongoose.model('product',productSchema);