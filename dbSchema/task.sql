create TABLE TASK(
    TASK_SEQ_NO INTEGER,
    INSTRUCTOR_ID VARCHAR(30),
    TASK_ID VARCHAR(30),
    IMAGEURL VARCHAR,
    EXPLANATION VARCHAR,
    LEVEL VARCHAR,
    SUB_STUDENT JSON
);

CREATE SEQUENCE TASK_SEQ_NO
START WITH 1 
INCREMENT BY 1;