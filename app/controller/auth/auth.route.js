"use strict";
import express from "express";
import reqValidator from "../../middlewares/req.validator.js";
import {
    authenticateUser
} from "../../middlewares/authentication.js";
import {
    createAuthAccess, createNormalUser, updateUserRecord
} from "./auth.controller.js";
import {
    loginVal, registerVal, updateUserVal
} from "./auth.validator.js";

const router = express.Router();

router.post("/login", reqValidator(loginVal), createAuthAccess);
router.post("/register", reqValidator(registerVal), createNormalUser);
router.put("/profile", authenticateUser, reqValidator(updateUserVal), updateUserRecord);

export default router;
