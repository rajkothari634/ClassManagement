create TABLE STUDENT(
    STUDENT_SEQ_NO INTEGER,
    STUDENT_ID VARCHAR(30) PRIMARY KEY,
    NAME VARCHAR(30),
    PASSWORD VARCHAR(15),
    LEVEL CHAR(1),
    INSTRUCTOR_ID VARCHAR(30),
    STUDENT_TASK JSON[]
);

create sequence  STUDENT_SEQ_NO
start with 1
increment by 1;