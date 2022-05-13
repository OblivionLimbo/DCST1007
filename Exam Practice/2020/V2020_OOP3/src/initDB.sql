DROP TABLE IF EXISTS Shows;
DROP TABLE IF EXISTS ShowRatings;

CREATE TABLE Shows (
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    PRIMARY KEY(id)
);
CREATE TABLE ShowRatings (
    id INT NOT NULL AUTO_INCREMENT,
    rating INT NOT NULL,
    showId INT NOT NULL,
    PRIMARY KEY(id)
);