"use strict";

import { responseSend } from "../../helpers/responseSend.js";
import { calculateAge } from "../../utils/helper.js";
import { httpCodes } from "../../utils/httpcodes.js";
import { readUsers } from "../auth/auth.service.js";
import {
    readEvents, createEvents, readAllEvents, updateEvents, deleteEvents
} from "./events.service.js";

export const insertEvents = async (req, res, next) => {
    try {
        const { _id } = req.session;
        req.body.userId = _id;
        await createEvents(req.body);

        return responseSend(res, httpCodes.OK, "Event Created Successfully", {});
    } catch (error) {
        next(error);
    }
};

export const getEventsList = async (req, res, next) => {
    try {
        const { keywords = "", pageNo = 0, limit = 10, sortBy = -1, sortField = "createdAt", type = null, priority = null, dueDate = null } = req.query;
        const { _id } = req.session;

        let filter = { userId: _id };

        if (keywords && keywords !== "")
            filter = {
                ...filter,
                $or: [
                    { title: { $regex: keywords, $options: 'i' } },
                    { description: { $regex: keywords, $options: 'i' } },
                ]
            };

        if (type) {
            filter.type = type;
        }
        if (priority) {
            filter.priority = priority;
        }
        if (dueDate) {
            filter.dueDate = dueDate;
        }

        let result = await readAllEvents(
            filter,
            { [sortField]: parseInt(sortBy) },
            pageNo,
            parseInt(limit),
        )

        responseSend(res, httpCodes.OK, "Events records", { ...result, ...req.query });
    } catch (error) {
        next(error);
    }
};

export const getSingleEvents = async (req, res, next) => {
    try {
        const { _id } = req.body;
        let result = await readEvents({ _id });

        return responseSend(res, httpCodes.OK, "Success", result);
    } catch (error) {
        next(error);
    }
};

export const editEvents = async (req, res, next) => {
    try {
        const { _id } = req.body;

        let records = await readEvents({ _id });
        if (!records) {
            throw new Error("Event does not exist!");
        }

        records = await updateEvents({ _id }, req.body)
        responseSend(res, httpCodes.OK, "Event updated successfully", records);
    } catch (error) {
        next(error);
    }
};

export const removeEvents = async (req, res, next) => {
    try {
        const { _id } = req.query;

        let records = await readEvents({ _id });
        if (!records) {
            throw new Error("Event does not exist!");
        }

        records = await deleteEvents({ _id })
        responseSend(res, httpCodes.OK, "Event deleted successfully", records);
    } catch (error) {
        next(error);
    }
};