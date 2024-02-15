import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const loginVal = Joi.object({
    email: Joi.string().email().allow('').required(),
    password: Joi.string().allow('').required(),
});

export const registerVal = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().allow('').required(),
    password: Joi.string().allow('').required(),
});

export const updateUserVal = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().allow(""),
});