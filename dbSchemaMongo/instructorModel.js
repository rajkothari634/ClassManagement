const mongoose = require("mongoose");
const validator = require("validator")

const instructorSchema = new mongoose.Schema({
    instructorName: {
        type: String,
        required: [true, "name of instructor is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "invalid email"],
    },
    password: {
        type: String,
        required: [true, "password of instructor is required"]
    },
    taskIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    studentIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, { timestamps: true });

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;