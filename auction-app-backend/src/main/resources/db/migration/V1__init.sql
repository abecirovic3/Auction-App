CREATE SEQUENCE IF NOT EXISTS app_user_sequence START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS product_image_sequence START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS product_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE app_user
(
    id            BIGINT       NOT NULL,
    first_name    VARCHAR(255) NOT NULL,
    last_name     VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL,
    password      VARCHAR(255) NOT NULL,
    role          VARCHAR(255) NOT NULL,
    date_of_birth date,
    phone_number  VARCHAR(255),
    photo_url     VARCHAR(255),
    CONSTRAINT pk_app_user PRIMARY KEY (id)
);

CREATE TABLE product
(
    id          BIGINT           NOT NULL,
    name        VARCHAR(255)     NOT NULL,
    description VARCHAR(255)     NOT NULL,
    start_price DOUBLE PRECISION NOT NULL,
    start_date  date             NOT NULL,
    end_date    date             NOT NULL,
    size        INTEGER,
    color       VARCHAR(255),
    CONSTRAINT pk_product PRIMARY KEY (id)
);

CREATE TABLE product_image
(
    id         BIGINT       NOT NULL,
    image_url  VARCHAR(255) NOT NULL,
    product_id BIGINT       NOT NULL,
    CONSTRAINT pk_product_image PRIMARY KEY (id)
);

ALTER TABLE app_user
    ADD CONSTRAINT user_email_unique UNIQUE (email);

ALTER TABLE product_image
    ADD CONSTRAINT FK_PRODUCT_IMAGE_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id);