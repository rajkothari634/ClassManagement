# ClassManagement

## Authentication Routes

1. /createstudent

2. /createinstructor

3. /login

## Protector Middelware

ProtectRoute.protect

## Routes Accessed by only Authenticated Instructor

1. /getAllTask

2. /createtask

3. /stuTaskPerformance

4. /putGrade

## Routes Accessed by only Authenticated Student

1. /getAllTask

2. /submitTask

3. /getGrade

## Database Handler

1. instructor.js

2. student.js

3. task.js

#### DbSchema for above three is given in /dbSchema

queries are handled by pg.js in /pg folder
