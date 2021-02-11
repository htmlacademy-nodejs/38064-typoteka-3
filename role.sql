-- Пароль учетной записи для работы с БД typoteka: 1typoteka1
CREATE ROLE typoteka WITH
    LOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD '1typoteka1';


CREATE DATABASE typoteka
    WITH
    OWNER = typoteka
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    CONNECTION LIMIT = -1;
GRANT ALL PRIVILEGES ON DATABASE typoteka TO typoteka;


-- Перед созданием схемы подключится к базе typoteka
CREATE SCHEMA main;
GRANT ALL PRIVILEGES ON SCHEMA main to typoteka;

ALTER DEFAULT PRIVILEGES
    FOR USER typoteka
    IN SCHEMA main
    GRANT ALL PRIVILEGES ON TABLES TO typoteka;

ALTER DEFAULT PRIVILEGES
    FOR USER typoteka
    IN SCHEMA main
    GRANT ALL PRIVILEGES ON FUNCTIONS TO typoteka;

ALTER DEFAULT PRIVILEGES
    FOR USER typoteka
    IN SCHEMA main
    GRANT ALL PRIVILEGES ON SEQUENCES TO typoteka;

ALTER DEFAULT PRIVILEGES
    FOR USER typoteka
    IN SCHEMA main
    GRANT ALL PRIVILEGES ON ROUTINES TO typoteka;
