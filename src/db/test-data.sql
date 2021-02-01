insert into user (first_name, last_name, birth_date, username, email, password, role)
values ('hanna', 'miklash', '1994-06-22', 'mimimiklash', 'anna@gmail.com', 'abc123', 'SuperUser');

insert into user (first_name, last_name, birth_date, username, email, password, role)
values ('maksim', 'andrzejewski', '1994-05-27', 'jakobian', 'maks@gmail.com', '123abc', 'SuperUser');

insert into user (first_name, last_name, birth_date, username, email, password, role)
values ('admin', 'admin', curdate(), 'admin', 'admin@gmail.com', '123admin', 'Admin');


insert into author( first_name, last_name, birth_date, death_date, nationality, image)
VALUES ( 'HP', 'Lovecraft', '1890-08-20', '1937-08-20', 'British',
        'https://t2.gstatic.com/images?q=tbn:ANd9GcQB0W58Hcr0IeB5aZqC_CYFzbc6onxJwBAjnj4TDpk8Z1p77A-Juo9m7JoztAld');
insert into author( first_name, last_name, birth_date, nationality, image)
VALUES ('Steven', 'King', '1947-09-21', 'American',
        'https://larryfire.files.wordpress.com/2014/01/stephen-king.jpg');
insert into author( first_name, last_name, birth_date, death_date, nationality, image)
VALUES ( 'William', 'Shakespeare', '1564-04-26', '1616-04-23', 'British',
        'https://cdn-lubimyczytac.pl/upload/authors/10304/171297-352x500.jpg');
insert into author( first_name, last_name, birth_date, nationality, image)
VALUES ( 'Neil', 'Gaiman', '1960-11-10', 'British', 'https://www.kgbreport.com/images/neilgaiman.jpg');
insert into author( first_name, last_name, birth_date, death_date, nationality, image)
VALUES ( 'Irvin', 'Shaw', '1913-02-27', '1965-05-16', 'American',
        'https://upload.wikimedia.org/wikipedia/commons/b/b9/Irwin_Shaw_%281948%29.jpg');
insert into author( first_name, last_name, birth_date, death_date, nationality, image)
VALUES ( 'Leo', 'Tolstoy', '1828-09-09', '1910-11-07', 'Russian',
        'https://cdn.britannica.com/94/4694-050-CABE0BB0/Leo-Tolstoy.jpg');
insert into author( first_name, last_name, birth_date, death_date, nationality, image)
VALUES ( 'Frank', 'Herbert', '1920-10-08', '1986-02-11', 'American',
        'https://www.peremeny.ru/blog/wp-content/uploads/2010/10/Frank_Herbert2.jpg');
insert into author( first_name, last_name, birth_date, death_date, nationality, image)
VALUES ( 'Alber', 'Camus', '1913-11-07', '1060-01-04', 'French Algerian',
        'https://soreal.ru/wp-content/uploads/2017/11/Albert-Camus-4.jpg');


insert into book(ISBN, title, author_id, image, genre, description)
VALUES ('1817451594483', 'Color out of space', 1,
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1319780371l/2978169.jpg', 'horror',
        'An unnamed narrator pieces together the story of an area known by the locals as the "blasted heath" in the wild hills west of the fictional town of Arkham, Massachusetts. The narrator discovers that many years ago a meteorite crashed there, poisoning every living being nearby; vegetation grows large but foul tasting, animals are driven mad and deformed into grotesque shapes, and the people go insane or die one by one.');
insert into book(ISBN, title, author_id, image, genre, description)
VALUES ('2363566383537', 'The Dunwich Horror', 1,
        'https://i.pinimg.com/originals/bc/11/83/bc11830e1f4b7c19e54cf77314552f46.jpg', 'horror',
        'It is a horror novelette (a short novel) by American writer H. P. Lovecraft. Written in 1928, it was first published in the April 1929 issue of Weird Tales. It takes place in Dunwich, a fictional town in Massachusetts. It is considered one of the core stories of the Cthulhu Mythos.');
insert into book(ISBN, title, author_id, image, genre, description)
VALUES ('4598626170227', 'The Green Mile', 2, 'https://m.media-amazon.com/images/I/51w3VVwMMkL.jpg', 'fiction',
        'It tells the story of death row supervisor Paul Edgecombe''s encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities. The serial novel was originally released in six volumes before being republished as a single-volume work. The book is an example of magical realism.');
insert into book(ISBN, title, author_id, image, genre, description)
VALUES ('4386901887123', 'IT', 2,
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1334416842l/830502.jpg', 'horror',
        'The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey. "It" primarily appears in the form of Pennywise the Dancing Clown to attract its preferred prey of young children.');
insert into book(ISBN, title, author_id, image, genre, description)
VALUES ('8911703543251', 'The Tragical Historie of Hamlet, Prince of Denmarke', 3,
        'https://i.pinimg.com/originals/fc/f0/0f/fcf00f6ee6ee3ce36cf21f246173ccd6.jpg', 'tragedy',
        'The ghost of the King of Denmark tells his son Hamlet to avenge his murder by killing the new king, Hamlet''s uncle. Hamlet feigns madness, contemplates life and death, and seeks revenge');
insert into book(ISBN, title, author_id, image, genre, description)
VALUES ('4004956964093', 'Twelfth Night', 3,
        'https://i.pinimg.com/236x/7f/70/3a/7f703a34089584d30a7c15d6f81bd3bb--shakespeare-plays-william-shakespeare.jpg',
        'comedy',
        'romantic comedy with several interwoven plots of romance, mistaken identities and practical jokes. Separated from her twin brother Sebastian in a shipwreck, Viola disguises herself as a boy, calls herself Cesario, and becomes a servant to the Duke Orsino.');
insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('6733784496462', 4, 'The Sandman', 'Graphic Novel',
        'https://i.pinimg.com/236x/a1/8a/cd/a18acdc6503a78a1258ed3905043f86a--best-comic-books-classic-comics.jpg',
        'The Sandman is an American comic book written by Neil Gaiman and published by DC Comics. ... The Sandman is a story about stories and how Morpheus, the Lord of Dreams, is captured and subsequently learns that sometimes change is inevitable.');
insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('7368252865663', 4, 'American Gods', 'Fantasy',
        'https://images-na.ssl-images-amazon.com/images/I/51Pb-OAREFL._SX327_BO1,204,203,200_.jpg',
        'Shadow is an ex-convict who is released from prison three days early when his wife Laura is killed in a car accident. Shadow is devastated by her death, and is distraught to learn that she died alongside his best friend Robbie, with whom she had been having an affair.');
insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('8580319643282', 4, 'The Ocean at the End of the Lane', 'Fantasy',
        'https://www.irishtimes.com/polopoly_fs/1.2515441.1454085204!/image/image.jpg',
        'It tells the story of a man who returns to Sussex for a funeral and then finds himself driving "randomly" to the scenes of his childhood. He is drawn to the Hempstock farmhouse wherein, he remembers, there lived three generations of powerful and mysterious Hempstock women');

insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('8315192129601', 5, 'Rich Man, Poor Man', 'Novel',
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1353725186l/315519.jpg',
        'Rich Man, Poor Man is the epic tale of one family; a tale that takes place from the turmoil of World War II to the beginning of Vietnam. There are three children in the Jordache family: Gretchen, the oldest, Rudolph, the responsible one, and Thomas, the troublemaker.');

insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('8006441583862', 5, 'Bury the Dead', 'Drama',
        'https://www.irishtimes.com/polopoly_fs/1.2515441.1454085204!/image/image.jpg',
        'Bury the Dead (1936) is an expressionist and anti-war drama. It dramatizes the refusal of six dead soldiers during an unspecified war—who represent a cross-section of American society—to be buried. ... Newspapers refuse to print the story in fear it will hurt the war effort.');

insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('1901657276848', 6, 'Peace and War', 'Novel',
        'https://kbimages1-a.akamaihd.net/f10f4dd2-a5fc-4049-acb1-c52bb99809a6/1200/1200/False/war-and-peace-148.jpg',
        'War and Peace broadly focuses on Napoleon’s invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment; Prince Andrei Bolkonsky, who leaves his family behind to fight in the war against Napoleon; and Natasha Rostov, the beautiful young daughter of a nobleman who intrigues both men.');

insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('5469633000822', 6, 'Resurrection', 'Novel',
        'https://www.irishtimes.com/polopoly_fs/1.2515441.1454085204!/image/image.jpg',
        'The book tells the story of Nekhlyudov, a wealthy aristocrat (like most Russian aristocrats, his wealth is inherited), in his quest to fix the evil he did to Katyusha (a young girl whom he seduced in the past, and who became a prostitute as a result of that), and understand all the rights and wrongs of life.');

insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('9780881036367', 7, 'Dune', 'Novel',
        'https://products-images.di-static.com/image/frank-herbert-dune/9780340960196-475x500-1.jpg',
        'Dune is based on a complex imagined society set roughly 20,000 years in the future. The setting is the year 10,191, and human beings have spread out and colonized planets throughout the universe. The Atreides arrive on Arrakis and the duke quickly moves to secure the planet from a Harkonnen attack.');

insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('6772319359487', 8, 'The Plague', 'Novel',
        'https://i.pinimg.com/originals/43/cd/cf/43cdcf7deb0d8abd7d95cc90ede8c135.jpg',
        'The Plague is a novel about a plague epidemic in the large Algerian city of Oran. ... Rieux''s colleague, Castel, becomes certain that the illness is the bubonic plague. He and Dr. Rieux are forced to confront the indifference and denial of the authorities and other doctors in their attempts to urge quick, decisive action.');

insert into book(ISBN, author_id, title, genre, image, description)
VALUES ('5540378524669', 8, 'The Stranger', 'Novel',
        'https://images.booksense.com/images/929/406/9781517406929.jpg',
        'A shipping clerk living in French Algiers in the 1940s, Meursault is a young, detached but ordinary man. The novel begins with Meursault receiving a telegram informing him of his mother''s death. He attends the funeral, but surprises other attendees with his unusual calm and (once again) detachment.');


insert into user_book (user_id, BOOK_ISBN, STATUS)
VALUES (1, '1817451594483', 'Finished'),
       (1, '2363566383537', 'Finished'),
       (1, '5469633000822', 'Finished'),
       (1, '6772319359487', 'Finished'),
       (1, '4004956964093', 'Wish List'),
       (1, '4004956964093', 'Wish List'),
       (1, '8315192129601', 'Abandoned'),
       (1, '5540378524669', 'Reading'),
       (1, '8006441583862', 'Abandoned'),
       (1, '5540378524669', 'Abandoned'),
       (2, '1901657276848', 'Finished'),
       (2, '9780881036367', 'Finished'),
       (2, '6733784496462', 'Abandoned'),
       (2, '8315192129601', 'Wish List'),
       (2, '8580319643282', 'Reading');
