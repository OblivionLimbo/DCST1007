-- Delete everything in the two tables
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS StudyPrograms;
DROP TABLE IF EXISTS Groups;

-- Recreate tables with correct fields
CREATE TABLE Students (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    groupId INTEGER NOT NULL
    -- FOREIGN KEY (groupId) REFERENCES Groups(id)
);

CREATE TABLE Groups (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    leaderId INTEGER NOT NULL,
    -- FOREIGN KEY (leaderId) REFERENCES Students(id)
    description TEXT NOT NULL,
    groupImage TEXT NOT NULL

);

-- Intitialize study programs with demo data
INSERT INTO Groups (name, leaderId, description, groupImage) VALUES ('Group A',1, "The Best Group", "https://www.ntnu.no/o/ntnu-theme/images/logo_ntnu.svg");
INSERT INTO Groups (name, leaderId, description, groupImage) VALUES ('Group B',4, "B stands for best right?", "https://www.ntnu.no/o/ntnu-theme/images/logo_ntnu.svg");
INSERT INTO Groups (name, leaderId, description, groupImage) VALUES ('Group C',6, "The core of the group", "https://www.ntnu.no/o/ntnu-theme/images/logo_ntnu.svg");

-- Initialize students with demo data
INSERT INTO Students (name, email, groupId) VALUES ('Kristoffer Kolombus','kris@stud.ntnu.no', 1);
INSERT INTO Students (name, email, groupId) VALUES ('Jonas Jaeger','jonas@stud.ntnu.no', 1);
INSERT INTO Students (name, email, groupId) VALUES ('Felix theCat','felix@stud.ntnu.no', 1);

INSERT INTO Students (name, email, groupId) VALUES ('Hank Green','hank@stud.ntnu.no', 2);
INSERT INTO Students (name, email, groupId) VALUES ('Incident Response','incident@stud.ntnu.no', 2);

INSERT INTO Students (name, email, groupId) VALUES ('Charlie Chaplin','charlie@stud.ntnu.no', 3);
INSERT INTO Students (name, email, groupId) VALUES ('Dwayne Johnson','rock@stud.ntnu.no', 3);