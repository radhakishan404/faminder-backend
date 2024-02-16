import { paginationPipeLine } from "../../helpers/aggregation-pipeline-pagination.js";
import Events from "../../models/events.js";

export const readEvents = async (filter, select = {}) => {
    try {
        const result = await Events.findOne(filter).select(select).lean();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateEvents = async (filter, update) => {
    try {
        const result = await Events.findOneAndUpdate(filter, update);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteEvents = async (filter) => {
    try {
        const result = await Events.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const readAllEvents = async (
    filter,
    sort = {},
    pageNo = 0,
    limit = 0,
    select = null
) => {
    try {
        const result = await Events.aggregate(paginationPipeLine(pageNo, filter, limit, sort, select))
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw new Error(error);
    }
}

export const createEvents = async (insertData) => {
    try {
        const result = new Events(insertData);
        await result.save();
        return result.toObject();
    } catch (error) {
        throw new Error(error);
    }
}

export const bulkEventsCreate = async (data) => {
    try {
        const result = await Events.insertMany(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}
