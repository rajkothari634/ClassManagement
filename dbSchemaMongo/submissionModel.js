const mongoose = require("mongoose");
const validator = require("validator")

const submissionSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "image url is required"]
    },
    marks:{
        type: Number,
        min: -1,
        max: 10,
        required:[true,"marks is required"],
        default: -1 //if -1 => still required to check by instructor
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true,"student id is required"]
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, "task id is required"]
    }
}, { timestamps: true });

submissionSchema.index({ studentId: 1, taskId: 1}, { unique: true });
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;

