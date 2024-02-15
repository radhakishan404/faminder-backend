Database Collection

1. users {
    _id: ObjectId, // MongoDB Object ID
    name: String,
    email: String,
    password: String,
}

2. events {
    _id: ObjectId, // MongoDB Object ID
    userId: ObjectId, // Reference to the parent user
    title: String,
    description: String,
    type: String, // e.g., 'Work', 'Personal', 'School', etc.
    priority: String, // e.g., 'High', 'Medium', 'Low', etc.
    dueDate: Date,
    reminders: [Date], // Array of reminder dates
    completed: Boolean,
}