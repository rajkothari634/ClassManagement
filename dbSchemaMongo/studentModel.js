const mongoose = require("mongoose");
const validator = require("validator")

const studentSchema = new mongoose.Schema({
    studentName: {
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
    instructorIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    }],
    submissionIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        required: [true,"submissionId is required"]
    }]
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

