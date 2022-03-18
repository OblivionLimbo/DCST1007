-- Delete everything in the two tables
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS StudyPrograms;

-- Recreate tables with correct fields
CREATE TABLE Students (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
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
INSERT INTO Students (name, studyProgramId) VALUES ('Ole Olsen', 1);
INSERT INTO Students (name, studyProgramId) VALUES ('Petter Pettersen', 1);

INSERT INTO Students (name, studyProgramId) VALUES ('Kari Karlsen', 2);
INSERT INTO Students (name, studyProgramId) VALUES ('Jens Jensen', 2);
INSERT INTO Students (name, studyProgramId) VALUES ('Lars Larsen', 2);

INSERT INTO Students (name, studyProgramId) VALUES ('Knut Knutsen', 3);