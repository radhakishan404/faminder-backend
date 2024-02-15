import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const insertEventsVal = Joi.object({
    title: Joi.string().required(),
    userId: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    priority: Joi.string().required(),
    dueDate: Joi.string().required(),
    reminders: Joi.array().allow([]),
    completed: Joi.string().allow("")
});

export const getEventsListVal = Joi.object({
    pageNo: Joi.string().allow(""),
    limit: Joi.string().allow(""),
    sortBy: Joi.string().allow(""),
    sortField: Joi.string().allow(""),
    keywords: Joi.string().allow(""),
    type: Joi.string().allow(""),
    priority: Joi.string().allow(""),
    dueDate: Joi.string().allow(""),
});

export const singleEventsVal = Joi.object({
    _id: Joi.string().required(),
});

export const editEventsVal = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    userId: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    priority: Joi.string().required(),
    dueDate: Joi.string().required(),
    reminders: Joi.array().allow([]),
    completed: Joi.string().allow("")
});