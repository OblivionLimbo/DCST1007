CREATE TABLE Items (
    id INT NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price INT NOT NULL,
    count INT NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO Items (name, description, price, count) VALUES ('Eple', 'Norske epler', 10, 200);
INSERT INTO Items (name, description, price, count) VALUES ('Appelsin', 'Fra Spania', 20, 100);
INSERT INTO Items (name, description, price, count) VALUES ('Melk', 'Tine Lettmelk', 25, 50);
INSERT INTO Items (name, description, price, count) VALUES ('Brød', 'Dansk rugbrød', 30, 20);

CREATE TABLE Orders (
    id INT NOT NULL AUTO_INCREMENT,
    itemId INT NOT NULL,
    itemCount INT NOT NULL,
    PRIMARY KEY(id)
);