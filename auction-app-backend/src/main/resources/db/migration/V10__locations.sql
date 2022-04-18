CREATE SEQUENCE IF NOT EXISTS city_sequence START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS country_sequence START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS street_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE country
(
    id   BIGINT       NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_country PRIMARY KEY (id)
);

CREATE TABLE city
(
    id         BIGINT       NOT NULL,
    name       VARCHAR(255) NOT NULL,
    country_id BIGINT       NOT NULL,
    CONSTRAINT pk_city PRIMARY KEY (id)
);

CREATE TABLE street
(
    id      BIGINT       NOT NULL,
    name    VARCHAR(255) NOT NULL,
    zipcode VARCHAR(255) NOT NULL,
    city_id BIGINT       NOT NULL,
    CONSTRAINT pk_street PRIMARY KEY (id)
);

ALTER TABLE app_user
    ADD street_id BIGINT;

ALTER TABLE product
    ADD street_id BIGINT;

ALTER TABLE category
    ADD CONSTRAINT category_name_unique UNIQUE (name, super_category_id);

ALTER TABLE app_user
    ADD CONSTRAINT FK_APP_USER_ON_STREET FOREIGN KEY (street_id) REFERENCES street (id);

ALTER TABLE city
    ADD CONSTRAINT FK_CITY_ON_COUNTRY FOREIGN KEY (country_id) REFERENCES country (id);

ALTER TABLE product
    ADD CONSTRAINT FK_PRODUCT_ON_STREET FOREIGN KEY (street_id) REFERENCES street (id);

ALTER TABLE street
    ADD CONSTRAINT FK_STREET_ON_CITY FOREIGN KEY (city_id) REFERENCES city (id);

INSERT INTO country VALUES (nextval('country_sequence'), 'Bosina & Herzegovina');
INSERT INTO country VALUES (nextval('country_sequence'), 'Germany');
INSERT INTO country VALUES (nextval('country_sequence'), 'Great Britain');
INSERT INTO country VALUES (nextval('country_sequence'), 'United States');
INSERT INTO country VALUES (nextval('country_sequence'), 'Nigeria');

INSERT INTO city (id, country_id, name) VALUES (nextval('city_sequence'), (select c.id from country c where c.name='Bosina & Herzegovina'), 'Sarajevo');
INSERT INTO city (id, country_id, name) VALUES (nextval('city_sequence'), (select c.id from country c where c.name='Germany'), 'Berlin');
INSERT INTO city (id, country_id, name) VALUES (nextval('city_sequence'), (select c.id from country c where c.name='Great Britain'), 'London');
INSERT INTO city (id, country_id, name) VALUES (nextval('city_sequence'), (select c.id from country c where c.name='United States'), 'Washington');
INSERT INTO city (id, country_id, name) VALUES (nextval('city_sequence'), (select c.id from country c where c.name='Nigeria'), 'Abuja');

INSERT INTO street (id, city_id, name, zipcode) VALUES (nextval('street_sequence'), (select c.id from city c where c.name='Sarajevo'), 'Titova 10', '71000');

UPDATE product set street_id = (select s.id from street s where s.name='Titova 10');

ALTER TABLE product
    ALTER COLUMN street_id SET NOT NULL;