import express from 'express';
import {config} from "dotenv";
import mongoose from 'mongoose';
import {router} from "./routes/user.js";

const app = express();


//DB
mongoose.connect(config().parsed.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(()=>{console.log('Database Connected')});

// Routes
app.use('/api',router);

app.listen(config().parsed.PORT,()=>{
    console.log('server running: '+config().parsed.PORT);
})