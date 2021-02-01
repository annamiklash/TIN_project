-- schema
CREATE SCHEMA tin_s18458;


-- tables
-- Table: author
CREATE TABLE author
(
    id          int          NOT NULL AUTO_INCREMENT,
    first_name  varchar(20)  NOT NULL,
    last_name   varchar(30)  NOT NULL,
    nationality varchar(30)  NOT NULL,
    death_date  varchar(10)   NULL,
    birth_date  varchar(10)   NOT NULL,
    image       varchar(500) NOT NULL,
    CONSTRAINT author_pk PRIMARY KEY (id)
);


-- Table: book
CREATE TABLE book
(
    ISBN      varchar(13)  NOT NULL,
    author_id int          NOT NULL,
    title     varchar(100) NOT NULL,
    genre     varchar(50)  NOT NULL,
    image     varchar(500) NOT NULL,
    description varchar(500) NOT NULL,
    CONSTRAINT book_pk PRIMARY KEY (ISBN)
);
-- Table: user
CREATE TABLE user
(
    id         int          NOT NULL AUTO_INCREMENT,
    first_name varchar(20)  NOT NULL,
    last_name  varchar(30)  NOT NULL,
    birth_date varchar(10)  NOT NULL,
    username   varchar(30)  NOT NULL,
    email      varchar(50)  NOT NULL,
    password   varchar(400) NOT NULL,
    role       ENUM ('Admin', 'SuperUser') DEFAULT 'SuperUser',
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table: user_book
CREATE TABLE user_book
(
    id        int         NOT NULL AUTO_INCREMENT,
    user_id   int         NOT NULL,
    book_ISBN varchar(13) NOT NULL,
    status    ENUM ('Reading', 'Wish List', 'Abandoned', 'Finished'),
    CONSTRAINT user_book_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: book_author (table: book)
ALTER TABLE book ADD CONSTRAINT book_author FOREIGN KEY book_author (author_id)
    REFERENCES author (id);

-- Reference: user_book_book (table: user_book)
ALTER TABLE user_book ADD CONSTRAINT user_book_book FOREIGN KEY user_book_book (book_ISBN)
    REFERENCES book (ISBN);

-- Reference: user_book_user (table: user_book)
ALTER TABLE user_book ADD CONSTRAINT user_book_user FOREIGN KEY user_book_user (user_id)
    REFERENCES user (id);
