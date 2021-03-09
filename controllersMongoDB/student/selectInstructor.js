const Student = require("../../databaseMongo/student");
const Instructor  = require("../../databaseMongo/instructor");
//402 instructor not found
//201 student is updated but not instructor
exports.selectInstructor = async (req,res) => {
    let errorCode = 500;
    try {
        const instructorId = req.body.instructorId;
        const studentId = req.body.studentId;
        if(!isValid(instructorId)){
            errorCode = 402
            throw Error("Instructor not found")
        }
        const result = await Student.insertInstructorId(studentId,instructorId);
        if(result.status){
            const updatedInstructor = await Instructor.insertStudentId(studentId,instructorId);
            if(updatedInstructor.status){
                res.status(200).json({
                    status: true,
                    data: {
                        insertedInstructorId: instructorId
                    }
                })
            }else{
                res.status(201).json({
                    status: false,
                    data: {
                        insertedInstructorId: instructorId
                    },
                    errorText: "Student is updated but not instructor"
                })
            }

        }else{
            throw Error("Error in inserting ")
        }
    } catch (err) {
        console.log(err)
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        })
    }
}
const isValid = async (instructorId) => {
    if(!isValidInstructor(instructorId)){
        return false
    }
    return true
}
const isValidInstructor = async (instructorId) => {
    const instructorDetail = await Instructor.findInstructorById({id: instructorId});
    if(instructorDetail.status){
        return true
    }else{
        return false
    }
}
