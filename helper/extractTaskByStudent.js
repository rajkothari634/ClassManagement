const Task = require("../databaseMongo/task");

exports.extractTaskByStudent = async (student) => {
    try {
        const instructorArray = student.instructorIds;
        const submissionArray = student.submissionIds;
        let taskHashMap = {}
        for(let i=0; i<instructorArray.length; i++){
            for(let j=0;j<instructorArray[i].taskIds.length;j++){
                let id = instructorArray[i].taskIds[j];
                let taskDetail = await Task.getTaskById(id);
                
                if(taskDetail.status){
                    taskHashMap[taskDetail.task._id] = taskDetail.task;
                }
            }
        }
        for(let j=0;j<submissionArray.length; j++){
            console.log("hui")
            let task = taskHashMap[submissionArray[j].taskId];
            
            task = {
                ...task._doc,
                submission: submissionArray[j]
            }
            taskHashMap[submissionArray[j].taskId] = task;
            console.log(task)
        }
        console.log(taskHashMap)
        return {
            status: true,
            taskHashMap: taskHashMap
        }
    
    } catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}