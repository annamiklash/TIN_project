insert into tin.user (id, first_name, last_name, birth_date, username, email, password, role)
values (1, 'hanna', 'miklash', curdate(), 'mimimiklash', 'anna@gmail.com', 'abc123', 'SuperUser');

insert into tin.user (id, first_name, last_name, birth_date, username, email, password, role)
values (2, 'maksim', 'andrzejewski', curdate(), 'jakobian', 'maks@gmail.com', '123abc', 'SuperUser');

insert into tin.user (id, first_name, last_name, birth_date, username, email, password, role)
values (3, 'admin', 'admin', curdate(), 'admin', 'admin@gmail.com', '123admin', 'Admin');

select *
from user;

insert into author(id, first_name, last_name, middle_name, nationality, image)
VALUES (1, 'Hovard', 'Lovecraft', 'P', 'British', '123');
insert into author(id, first_name, last_name, nationality, image)
VALUES (2, 'Steven', 'King', 'American', '123');
insert into author(id, first_name, last_name, nationality, image)
VALUES (3, 'William', 'Shakespeare', 'British', '123');

select *
from author;

insert into book(ISBN, title, author_id, image, genre)
VALUES ('ISBN_1', 'Color out of space', 1, '123', 'horror');
insert into book(ISBN, title, author_id, image, genre)
VALUES ('ISBN_2', 'The Dunwich Horror', 1, '123', 'horror');
insert into book(ISBN, title, author_id, image, genre)
VALUES ('ISBN_3', 'The Green Mile', 2, '123', 'fiction');
insert into book(ISBN, title, author_id, image, genre)
VALUES ('ISBN_4', 'IT', 2, '123', 'horror');
insert into book(ISBN, title, author_id, image, genre)
VALUES ('ISBN_5', 'The Tragical Historie of Hamlet, Prince of Denmarke', 3, '123', 'tragedy');
insert into book(ISBN, title, author_id, image, genre)
VALUES ('ISBN_6', 'Twelfth Night', 3, '123', 'comedy');


select *
from book;


insert into user_book (ID, USER_ID, BOOK_ISBN, STATUS)
VALUES (1, 1, 'ISBN_1', 'Finished'),
       (2, 1, 'ISBN_2', 'Finished'),
       (3, 1, 'ISBN_5', 'Wish List'),
       (4, 1, 'ISBN_4', 'Abandoned'),
       (5, 2, 'ISBN_4', 'Finished'),
       (6, 2, 'ISBN_1', 'Abandoned'),
       (7, 2, 'ISBN_6', 'Wish List'),
       (8, 2, 'ISBN_3', 'Reading');

select *
from user_book;
