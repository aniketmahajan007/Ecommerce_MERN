import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 40
        },
    },{timestamps: true}
);


export default mongoose.model('category',categorySchema);