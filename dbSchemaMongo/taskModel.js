const mongoose = require("mongoose");
const validator = require("validator")

const taskSchema = new mongoose.Schema({
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: [true,"instructor id is required"]
    },
    imageUrl: {
        type: String,
        required: [true, "image url is required"]
    },
    level: {
        type: String,
        enum: ["Beginner","Intermediate","Advance"],
        required: [true,"level of task need to be specified"]
    },
    endDate: {
        type: Date,
        required: [true, "last submission date of task is required"]
    },
    explanation: {
        type: String,
        required: [true, "explanation of task is required"]
    },
    submissionIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        required: [true,"submissionId is required"]
    }]
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;