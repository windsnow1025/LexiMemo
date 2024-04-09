CREATE TABLE IF NOT EXISTS user
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type     VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS word
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    word             VARCHAR(255) NOT NULL,
    translation      VARCHAR(255) NOT NULL,
    example_sentence TEXT,
    frequency        INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS word_dictionary
(
    dictionary_id INT,
    word_id INT,
    PRIMARY KEY (dictionary_id, word_id)
);

CREATE TABLE IF NOT EXISTS dictionary
(
    dictionary_id INT AUTO_INCREMENT PRIMARY KEY ,
    dictionary_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_word
(
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    weight  DOUBLE,
    day     DATE,
    PRIMARY KEY (user_id, word_id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (word_id) REFERENCES word (id)
)

