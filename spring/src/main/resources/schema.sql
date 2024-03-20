CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS words (
    word_id INT AUTO_INCREMENT PRIMARY KEY ,
    word VARCHAR(255) NOT NULL ,
    translation VARCHAR(255) NOT NULL ,
    example_sentence TEXT,
    frequency INT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_word(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    user_id INT NOT NULL ,
    word_id INT NOT NULL ,
    weight DOUBLE,
    day DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (word_id) REFERENCES words(word_id)
)

