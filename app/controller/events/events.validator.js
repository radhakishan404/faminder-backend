import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

export const insertEventsVal = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    priority: Joi.string().required(),
    dueDate: Joi.string().required(),
    reminders: Joi.array().optional(),
    completed: Joi.string().optional()
});

export const getEventsListVal = Joi.object({
    pageNo: Joi.string().optional(),
    limit: Joi.string().optional(),
    sortBy: Joi.string().optional(),
    sortField: Joi.string().optional(),
    keywords: Joi.string().optional(),
    type: Joi.string().optional(),
    priority: Joi.string().optional(),
    dueDate: Joi.string().optional(),
});

export const singleEventsVal = Joi.object({
    _id: Joi.string().required(),
});

export const editEventsVal = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    priority: Joi.string().required(),
    dueDate: Joi.string().required(),
    reminders: Joi.array().optional(),
    completed: Joi.string().optional()
});