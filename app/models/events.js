import mongoose from "mongoose";

var eventsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['Work', 'Personal', 'School'], required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    dueDate: { type: Date },
    time: { type: String },
    completed: { type: Boolean, default: false },
}, { versionKey: false, timestamps: true });

const Events = mongoose.model("events", eventsSchema);

export default Events;