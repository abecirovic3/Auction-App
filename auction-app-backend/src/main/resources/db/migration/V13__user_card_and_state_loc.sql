CREATE SEQUENCE IF NOT EXISTS card_sequence START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS state_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE card
(
    id              BIGINT       NOT NULL,
    number          VARCHAR(255) NOT NULL,
    name            VARCHAR(255) NOT NULL,
    expiration_date date         NOT NULL,
    cvc             VARCHAR(255) NOT NULL,
    CONSTRAINT pk_card PRIMARY KEY (id)
);

CREATE TABLE state
(
    id   BIGINT       NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_state PRIMARY KEY (id)
);

ALTER TABLE app_user
    ADD card_id BIGINT;

ALTER TABLE city
    ADD state_id BIGINT;

ALTER TABLE card
    ADD CONSTRAINT card_number_unique UNIQUE (number);

ALTER TABLE state
    ADD CONSTRAINT state_name_unique UNIQUE (name);

ALTER TABLE app_user
    ADD CONSTRAINT FK_APP_USER_ON_CARD FOREIGN KEY (card_id) REFERENCES card (id);

ALTER TABLE city
    ADD CONSTRAINT FK_CITY_ON_STATE FOREIGN KEY (state_id) REFERENCES state (id);