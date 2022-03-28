DELETE FROM product_user_bid;

ALTER TABLE product_user_bid
    DROP COLUMN date;

ALTER TABLE product_user_bid
    ADD COLUMN date DATE NOT NULL;

ALTER TABLE product_user_bid
    ALTER COLUMN date SET NOT NULL;