import express from 'express';
import {config} from "dotenv";
import mongoose from 'mongoose';
import morgon from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {router as auth_router} from "./routes/auth.js";
import {routers as user_router} from "./routes/user.js";
import {router as category_router} from "./routes/category.js";
import {router as product_router} from "./routes/product.js";
import cors from 'cors';

const app = express();

//DB
mongoose.connect(config().parsed.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(()=>{console.log('Database Connected')});

// Middleware
app.use(morgon('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Routes
app.use('/api',auth_router);
app.use('/api',user_router);
app.use('/api',category_router);
app.use('/api',product_router);

app.listen(config().parsed.PORT,()=>{
    console.log('server running: '+config().parsed.PORT);
})