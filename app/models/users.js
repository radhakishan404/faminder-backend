import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        unique: true
    },
    name: String,
    email: String,
    password: String,
}, { versionKey: false, timestamps: true });

userSchema.pre("save", async function (next) {
    const user = this;
    user.uuid = user._id;
    next();
});

userSchema.statics.findOneOrCreate = function (condition, doc, callback) {
    const self = this;
    self.findOne(condition, '-_id', (err, result) => {
        return result
            ? callback(err, { created: false, ...result.toObject() })
            : self.create(doc, (err, result) => {
                return callback(err, { created: true, ...result.toObject() });
            });
    });
};

const Users = mongoose.model("users", userSchema);

export default Users;