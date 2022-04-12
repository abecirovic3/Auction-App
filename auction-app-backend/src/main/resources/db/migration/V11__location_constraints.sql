ALTER TABLE product_image
    ADD delete_hash VARCHAR(255);

ALTER TABLE city
    ADD CONSTRAINT city_country_unique UNIQUE (name, country_id);

ALTER TABLE country
    ADD CONSTRAINT country_name_unique UNIQUE (name);

ALTER TABLE street
    ADD CONSTRAINT street_name_zipcode_unique UNIQUE (name, zipcode);