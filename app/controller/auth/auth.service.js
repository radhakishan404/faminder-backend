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

export const createUsers = async (insertData) => {
    try {
        const result = new Users(insertData);
        await result.save();
        return result.toObject();
    } catch (error) {
        throw new Error(error);
    }
}