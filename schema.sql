CREATE TABLE categories
(
    id    integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(30) NOT NULL
        CONSTRAINT category_min_length CHECK ( length(title) >= 5 )
        CONSTRAINT category_max_length CHECK ( length(title) <= 30)
);


CREATE TABLE users
(
    id            integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email         varchar(255) UNIQUE NOT NULL,
    avatar        varchar(50),
    first_name    varchar(255)        NOT NULL,
    last_name     varchar(255)        NOT NULL,
    password_hash varchar(255)        NOT NULL
);


CREATE TABLE articles
(
    id               integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title            varchar(250) NOT NULL
        CONSTRAINT article_title_min_length CHECK ( length(title) >= 30 )
        CONSTRAINT article_title_max_length CHECK ( length(title) <= 250 ),
    image            varchar(50),
    publication_date timestamp DEFAULT current_timestamp,
    announcement     varchar(250) NOT NULL
        CONSTRAINT article_announcement_min_length CHECK ( length(announcement) >= 30 )
        CONSTRAINT article_announcement_max_length CHECK ( length(announcement) <= 250 ),
    text             text
        CONSTRAINT article_text_max_length CHECK ( length(text) <= 1000 )
);


CREATE TABLE comments
(
    id          integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_date timestamp DEFAULT current_timestamp,
    text        text    NOT NULL
        CONSTRAINT comment_min_length CHECK (length(text) >= 20),
    article_id  integer NOT NULL,
    user_id     integer NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


CREATE TABLE articles_categories
(
    article_id  integer NOT NULL,
    category_id integer NOT NULL,
    PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);


CREATE INDEX ON articles (title);
