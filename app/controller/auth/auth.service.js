import { paginationPipeLine } from "../../helpers/aggregation-pipeline-pagination.js";
import Users from "../../models/users.js"

export const readUsers = async (filter, select = {}) => {
    try {
        const result = await Users.findOne(filter).select(select).lean();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateUser = async (filter, update) => {
    try {
        const result = await Users.findOneAndUpdate(filter, update);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const readAllUsers = async (
    filter,
    select = { _id: 1 },
    sort = {},
    pageNo = 0,
    limit = 0,
) => {
    try {
        // paginationPipeLine is helping us to convert the records into server side pagination see the middleware for the detail code
        const result = await Users.aggregate(paginationPipeLine(pageNo, filter, limit, sort, select))
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw new Error(error);
    }
}

export const createUsers = async (insertData) => {
    try {
        const result = new Users(insertData);
        await result.save();
        return result.toObject();
    } catch (error) {
        throw new Error(error);
    }
}

export const bulkUserCreate = async (data) => {
    try {
        const result = await Users.insertMany(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteUsers = async (filter) => {
    try {
        const result = await Users.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}