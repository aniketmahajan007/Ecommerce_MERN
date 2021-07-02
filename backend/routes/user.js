import express from "express";

export const router = express.Router();

import {sayHi} from "../controller/user.js";

router.get('/',sayHi);

