-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-01-09 12:59:08.037

-- foreign keys
ALTER TABLE book
    DROP FOREIGN KEY book_author;

ALTER TABLE user_book
    DROP FOREIGN KEY user_book_book;

ALTER TABLE user_book
    DROP FOREIGN KEY user_book_user;

-- tables
DROP TABLE author;

DROP TABLE book;

DROP TABLE user;

DROP TABLE user_book;

-- End of file.

