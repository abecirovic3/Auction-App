CREATE SEQUENCE IF NOT EXISTS product_user_bid_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE product_user_bid
(
    id         BIGINT           NOT NULL,
    product_id BIGINT           NOT NULL,
    bidder_id  BIGINT           NOT NULL,
    amount     DOUBLE PRECISION NOT NULL,
    date       TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_product_user_bid PRIMARY KEY (id)
);

ALTER TABLE product_user_bid
    ADD CONSTRAINT FK_PRODUCT_USER_BID_ON_BIDDER FOREIGN KEY (bidder_id) REFERENCES app_user (id);

ALTER TABLE product_user_bid
    ADD CONSTRAINT FK_PRODUCT_USER_BID_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE  product
    ALTER COLUMN description TYPE TEXT;