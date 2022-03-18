-- Delete everything in the two tables
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS StudyPrograms;

-- Recreate tables with correct fields
CREATE TABLE Students (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    studyProgramId INTEGER NOT NULL
    -- FOREIGN KEY (studyProgramId) REFERENCES StudyPrograms(id)
);

CREATE TABLE StudyPrograms (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    code TEXT NOT NULL
);

-- Intitialize study programs with demo data
INSERT INTO StudyPrograms (name, code) VALUES ('Digital Infrastruktur og Cybersikkerhet', "BDIGSEC");
INSERT INTO StudyPrograms (name, code) VALUES ('Digital forretningsutvikling', "ITBAITBEDR");
INSERT INTO StudyPrograms (name, code) VALUES ('Informasjonsbehandling', "ITBAINFO");

-- Initialize students with demo data
INSERT INTO Students (name, email, studyProgramId) VALUES ('Kristoffer Kolombus','kris@stud.ntnu.no', 1);
INSERT INTO Students (name, email, studyProgramId) VALUES ('Jonas Jaeger','jonas@stud.ntnu.no', 1);
INSERT INTO Students (name, email, studyProgramId) VALUES ('Felix theCat','felix@stud.ntnu.no', 1);

INSERT INTO Students (name, email, studyProgramId) VALUES ('Hank Green','hank@stud.ntnu.no', 2);
INSERT INTO Students (name, email, studyProgramId) VALUES ('Incident Response','incident@stud.ntnu.no', 2);

INSERT INTO Students (name, email, studyProgramId) VALUES ('Charlie Chaplin','charlie@stud.ntnu.no', 3);
INSERT INTO Students (name, email, studyProgramId) VALUES ('Dwayne Johnson','rock@stud.ntnu.no', 3);