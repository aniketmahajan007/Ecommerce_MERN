import express from "express";

export const router = express.Router();

import {signup} from "../controller/signup.js";

router.post('/signup',signup);

