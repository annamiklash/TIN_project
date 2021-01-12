-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-01-09 12:59:08.037

-- tables
-- Table: author
CREATE TABLE author
(
    id          int         NOT NULL,
    first_name  varchar(20) NOT NULL,
    last_name   varchar(30) NOT NULL,
    middle_name varchar(20) NULL,
    nationality varchar(30) NOT NULL,
    image       blob        NULL,
    CONSTRAINT author_pk PRIMARY KEY (id)
);

-- Table: book
CREATE TABLE book (
    ISBN varchar(13) NOT NULL,
    author_id int NOT NULL,
    title varchar(100) NOT NULL,
    genre varchar(50) NOT NULL,
    image blob NULL,
    rating decimal(3,2) DEFAULT 0.0 NOT NULL,
    CONSTRAINT book_pk PRIMARY KEY (ISBN)
);
-- Table: user
CREATE TABLE user
(
    id         int          NOT NULL,
    first_name varchar(20)  NOT NULL,
    last_name  varchar(30)  NOT NULL,
    birth_date date         NOT NULL,
    username   varchar(30)  NOT NULL,
    email      varchar(50)  NOT NULL,
    password   varchar(400) NULL,
    role       ENUM ('Admin', 'SuperUser') DEFAULT 'SuperUser',
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table: user_book
CREATE TABLE user_book
(
    id        int              NOT NULL,
    user_id   int              NOT NULL,
    book_ISBN varchar(13)      NOT NULL,
    status    ENUM ('Reading', 'Wish List', 'Abandoned', 'Finished'),
    rating    ENUM ('1','2','3','4','5','Not Read') DEFAULT 'Not Read',
    CONSTRAINT user_book_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: book_author (table: book)
ALTER TABLE book
    ADD CONSTRAINT book_author FOREIGN KEY book_author (author_id)
        REFERENCES author (id);

-- Reference: user_book_book (table: user_book)
ALTER TABLE user_book
    ADD CONSTRAINT user_book_book FOREIGN KEY user_book_book (book_ISBN)
        REFERENCES book (ISBN);

-- Reference: user_book_user (table: user_book)
ALTER TABLE user_book
    ADD CONSTRAINT user_book_user FOREIGN KEY user_book_user (user_id)
        REFERENCES user (id);

-- End of file.

