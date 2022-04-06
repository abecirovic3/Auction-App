DELETE FROM product_user_bid;

ALTER TABLE product
    ADD highest_bid DOUBLE PRECISION;