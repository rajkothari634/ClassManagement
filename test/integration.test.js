const Instructor = require("../databaseMongo/instructor");
const mongoose = require("mongoose");
const fs = require("fs");
///pre for encrypt
const request = require('supertest')
const app = require("../app")
describe('Post Endpoints', () => {
  let instructor = {}
  let task = {}
  let student = {}
  let submission={}
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
        if (err) {
            process.exit(1);
        }
    });
  });

  it('should create a new instructor', async () => {
    const res = await request(app)
      .post('/instructor/createInstructor')
      .send({
        instructorName: "XYZ",
        email: "xyz@gmail.com",
        password: "12341234"
      })
    expect(res.status).toEqual(200);
    instructor = res.body.data.instructor;
    expect(instructor.instructorName).toEqual("XYZ");
    expect(instructor.email).toEqual("xyz@gmail.com");
    expect(instructor.jwToken).toBeDefined();
    expect(instructor.id).toBeDefined();
  });
  it('should create a new task',async () => {
    const taskImagePath = `${__dirname}/testImages/taskImage.jpg`;
    fs.exists(taskImagePath,(exists) => {
      if (!exists) throw new Error('file does not exist');
    })
    const  res = await request(app)
      .post("/task/createTask")
      .set('authorization', instructor.jwToken)
      .attach('image', taskImagePath)
      .field('instructorId',instructor.id)
      .field('taskName',"task for testing")
      .field("level","Beginner")
      .field("endDate","03-13-2021")
      .field("explanation","task explanation")
    
    expect(res.status).toEqual(200);
    task = res.body.data.task;
    expect(task.taskName).toEqual("task for testing");
    expect(task.level).toEqual("Beginner");
    expect(task._id).toBeDefined()
    expect(new Date(task.endDate)).toEqual( new Date("03-13-2021"))
  })
  it('should create a new student',async () => {
    const res = await request(app)
      .post("/student/createStudent")
      .send({
        studentName: "ABC",
        email: "abc@gmail.com",
        password: "12341234"
      })
    expect(res.status).toEqual(200);
    student = res.body.data.student;
    expect(student.studentName).toEqual("ABC");
    expect(student.email).toEqual("abc@gmail.com");
    expect(student.jwToken).toBeDefined();
  })
  it('should enrolled student to a instructor', async () => {
    const res = await request(app)
      .post('/student/selectInstructor')
      .set('authorization',student.jwToken)
      .send({
        instructorId: instructor.id,
        studentId: student.id
      })
    expect(res.status).toEqual(200);
    expect(res.body.data.insertedInstructorId).toEqual(instructor.id);
  })
  it('should submit solution for a task', async () => {
    const submissionImagePath = `${__dirname}/testImages/submissionImage.jfif`;
    fs.exists(submissionImagePath,(exists) => {
      if (!exists) throw new Error('file does not exist');
    })
    const res = await request(app)
      .post("/submission/createSubmission")
      .set('authorization', student.jwToken)
      .attach('image', submissionImagePath)
      .field('studentId',student.id)
      .field('taskId',task._id)
    expect(res.status).toEqual(200);
    submission = res.body.data.submission;
    expect(submission._id).toBeDefined();
  })

  //instructor route

  it('should get all instructor',async() => {
    const res = await request(app)
      .post("/instructor/getAllInstructor")
      .set('authorization', instructor.jwToken)
    expect(res.status).toEqual(200)
  })
  it('should get all task created by instructor', async () => {
    const res = await request(app)
      .get("/instructor/getAllTask?id=" + instructor.id)
      .set('authorization', instructor.jwToken)
    expect(res.status).toEqual(200)
    expect(res.body.data.taskArray.length).toEqual(1)
  })
  it('should get all student enrolled for the instructor', async() => {
    const res = await request(app)
      .get("/instructor/getAllStudent?id=" + instructor.id)
      .set('authorization', instructor.jwToken)
    expect(res.status).toEqual(200)
    expect(res.body.data.studentArray.length).toEqual(1)
  })
  it('should get instructor details',async()=>{
    const res = await request(app)
      .get("/instructor/getInstructor?id=" + instructor.id)
      .set('authorization', instructor.jwToken)
    expect(res.status).toEqual(200)
    expect(res.body.data.instructor._id).toEqual(instructor.id);
  })
  it('should get all submission of task created by instructor',async()=>{
    const res = await request(app)
      .get("/instructor/getAllSubmission?id=" + instructor.id)
      .set('authorization', instructor.jwToken)
    expect(res.status).toEqual(200)
    expect(res.body.data.submissionArray.length).toEqual(1);
  })

  //student route

  it('should get all task assigned to the student', async() => {
    const res = await request(app)
      .get("/student/getAllTask?id=" + student.id)
      .set('authorization', student.jwToken)
      expect(res.status).toEqual(200)
      expect(res.body.data.taskHashMap).toBeDefined();
  })
  it('should get all student', async() => {
    const res = await request(app)
      .post("/student/getAllStudent")
      .set('authorization', student.jwToken)
      expect(res.status).toEqual(200)
      expect(res.body.data.studentArray.length).toEqual(1);
  })
  it('should get details of student', async() => {
    const res = await request(app)
      .get("/student/getStudent?id=" + student.id)
      .set('authorization', student.jwToken)
      expect(res.status).toEqual(200)
      expect(res.body.data.student._id).toEqual(student.id);
  })
  it('should get all submission of student', async() => {
    const res = await request(app)
      .get("/student/getAllSubmission?id=" + student.id)
      .set('authorization', student.jwToken)
      expect(res.status).toEqual(200)
      expect(res.body.data.submissionArray.length).toEqual(1);
  })
  it('should get all instructor to which student is enrolled', async() => {
    const res = await request(app)
      .get("/student/getAllInstructor?id=" + student.id)
      .set('authorization', student.jwToken)
      expect(res.status).toEqual(200)
      expect(res.body.data.instructorArray.length).toEqual(1);
  })
  
  //task  route

  it('should update the task',async()=>{
    const updateTaskImagePath = `${__dirname}/testImages/updateTaskImage.png`;
    fs.exists(updateTaskImagePath,(exists) => {
      if (!exists) throw new Error('file does not exist');
    })
    const res = await request(app)
      .post("/task/updateTask")
      .set('authorization', instructor.jwToken)
      .field('taskId',task._id)
      .attach('image', updateTaskImagePath)
      .field('taskName',"task for updating testing")
      .field("endDate","03-14-2021")
    expect(res.status).toEqual(200);
    task = res.body.data.updatedTask;
    expect(task.taskName).toEqual("task for updating testing")
    expect(new Date(task.endDate)).toEqual(new Date("03-14-2021"))
  })
  it('should get all the submission of the task',async () => {
    const res = await request(app)
    .get("/task/getAllSubmission?taskId=" + task._id)
    .set('authorization', instructor.jwToken)
    expect(res.status).toEqual(200)
    expect(res.body.data.submissionArray.length).toEqual(1);
  })
  it('should get all task',async () => {
    const res = await request(app)
    .post("/task/getAllTask")
    .set('authorization', instructor.jwToken)
    expect(res.status).toEqual(200)
    expect(res.body.data.taskArray.length).toEqual(1);
  })
  it('should get details task',async () => {
    const res = await request(app)
    .get("/task/getTask?taskId=" + task._id)
    .set('authorization', instructor.jwToken)
    expect(res.status).toEqual(200)
    expect(res.body.data.task._id).toEqual(task._id);
  })

  //submission route

  it('should give marks to submission',async() => {
    const res = await request(app)
      .post("/submission/putMarks")
      .set('authorization', instructor.jwToken)
      .send({
        "marks":"9",
        "submissionId":submission._id
      })
    expect(res.status).toEqual(200)
    expect(res.body.data.submissionId).toEqual(submission._id);
    expect(res.body.data.marks).toEqual("9")
  })
  it('should get submission details',async() => {
    const res = await request(app)
    .get("/submission/getSubmission?submissionId=" + submission._id)
    .set('authorization', student.jwToken)
    expect(res.status).toEqual(200)
    expect(res.body.data.submission._id).toEqual(submission._id);
  })
  it('should update submission',async() => {
    const updateSubmissionImagePath = `${__dirname}/testImages/updateSubmissionImage.jpg`;
    fs.exists(updateSubmissionImagePath,(exists) => {
      if (!exists) throw new Error('file does not exist');
    })
    const res = await request(app)
      .post("/submission/updateSubmission")
      .set('authorization', student.jwToken)
      .attach('image', updateSubmissionImagePath)
      .field('submissionId',submission._id)
      .field('studentId',student.id)
    expect(res.status).toEqual(200);
    submission = res.body.data.updatedSubmission;
    expect(submission._id).toBeDefined();
  })



})