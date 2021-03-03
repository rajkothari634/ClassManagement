const Task = require("../databaseMongo/task");

exports.extractTask = async (student) => {
    try {
        const instructorArray = student.instructorIds;
        const submissionArray = student.submissionIds;
        let taskIdArray = []
        for(let i=0; i<instructorArray.length; i++){
            for(let j=0;j<instructorArray[i].taskIds.length;j++){
                taskIdArray.push(instructorArray[i].taskIds[j]);
            }
        }
        let taskHashMap = {}
        for(let i=0;i<taskIdArray.length;i++){
            let taskDetail = await Task.getTaskById(taskIdArray[i]);
            if(taskDetail.status){
                taskHashMap[taskDetail.task._id] = taskDetail.task;
                taskHashMap[taskDetail.task._id].completed = false;
            }
        }
        for(let j=0;j<submissionArray.length; j++){
            taskHashMap[submissionArray[i].taskId].completed = true;
        }
        return {
            status: true,
            taskHashMap: taskHashMap
        }
    
    } catch (err) {
        return {
            status: false
        }
    }
}