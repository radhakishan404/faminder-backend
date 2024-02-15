"use strict";

import { responseSend } from "../../helpers/responseSend.js";
import { generateSession } from "../../helpers/tokenization.js";
import { httpCodes } from "../../utils/httpcodes.js";
import sha256 from "sha256";
import { readUsers, createUsers, updateUser } from "./auth.service.js";

export const createAuthAccess = async (req, res, next) => {
    try {
        req.body.password = sha256(req.body.password);
        const userFilter = {
            email: req.body.email
        };
        let result = await readUsers(userFilter);
        if (!result) {
            throw new Error("Email is incorrect! Or you are not registered.");
        }
        if (result && result.password !== req.body.password) {
            throw new Error("Password is incorrect!");
        }

        const token = await generateSession({
            _id: result['_id'],
            email: result["email"],
            name: result["name"]
        });

        return responseSend(res, httpCodes.OK, "Authentication Success", { ...result, token });
    } catch (error) {
        next(error);
    }
};

export const createNormalUser = async (req, res, next) => {
    try {
        req.body.password = sha256(req.body.password);
        let filter = { "email": req.body.email };
        let doc;
        doc = await readUsers(filter, "_id");
        if (doc) {
            throw new Error("Email already exists!");
        }
        doc = await createUsers(req.body);
        if (doc) {
            const token = await generateSession({
                _id: doc['_id'],
                email: doc["email"],
                name: doc["name"]
            });
            return responseSend(res, httpCodes.OK, "You are registered with us, our team will connect with you", token);
        }
    } catch (error) {
        next(error);
    }
};

export const updateUserRecord = async (req, res, next) => {
    try {
        const { _id } = req.session;

        let profileData = await readUsers({ _id });
        if (!profileData) {
            throw new Error("User does not exist!");
        }

        if (req.body.password) {
            req.body.password = sha256(req.body.password);
        }

        profileData = await updateUser({ _id }, req.body)
        responseSend(res, httpCodes.OK, "Profile updated successfully");
    } catch (error) {
        next(error);
    }
};