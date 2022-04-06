DELETE FROM product_user_bid;
DELETE FROM product_image;
DELETE FROM product;

CREATE SEQUENCE IF NOT EXISTS category_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE category
(
    id                BIGINT       NOT NULL,
    super_category_id BIGINT,
    name              VARCHAR(255) NOT NULL,
    CONSTRAINT pk_category PRIMARY KEY (id)
);

ALTER TABLE product
    ADD category_id BIGINT;

ALTER TABLE product
    ALTER COLUMN category_id SET NOT NULL;

ALTER TABLE category
    ADD CONSTRAINT FK_CATEGORY_ON_SUPER_CATEGORY FOREIGN KEY (super_category_id) REFERENCES category (id);

ALTER TABLE product
    ADD CONSTRAINT FK_PRODUCT_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES category (id);

INSERT INTO category (id, name) VALUES (1, 'Women');
INSERT INTO category (id, name) VALUES (2, 'Technology');
INSERT INTO category (id, name) VALUES (3, 'Kids');
INSERT INTO category (id, name) VALUES (4, 'Tools');
INSERT INTO category (id, super_category_id, name) VALUES (5, 1, 'Shoes');
INSERT INTO category (id, super_category_id, name) VALUES (6, 1, 'Jewellery');
INSERT INTO category (id, super_category_id, name) VALUES (7, 2, 'Keyboards');
INSERT INTO category (id, super_category_id, name) VALUES (8, 2, 'Monitors');
INSERT INTO category (id, super_category_id, name) VALUES (9, 2, 'CPU');
INSERT INTO category (id, super_category_id, name) VALUES (10, 2, 'Mobile Phones');
INSERT INTO category (id, super_category_id, name) VALUES (11, 3, 'Blankets');
INSERT INTO category (id, super_category_id, name) VALUES (12, 4, 'Chainsaws');

INSERT INTO product (id, seller_id, category_id, name, description, start_price, start_date, end_date) VALUES (1, 1, 5, 'Running shoes', 'Nike', 120.99, '2022-03-10 10:05', '2022-04-10 10:05');
INSERT INTO product (id, seller_id, category_id, name, description, start_price, start_date, end_date) VALUES (2, 1, 7, 'Keyboard', 'Genius', 15.50, '2022-05-20 16:30', '2022-08-10 16:30');
INSERT INTO product (id, seller_id, category_id, name, description, start_price, start_date, end_date) VALUES (3, 1, 8, 'Monitor', 'ASUS', 150.99, '2022-05-10 08:00', '2022-05-16 08:00');
INSERT INTO product (id, seller_id, category_id, name, description, start_price, start_date, end_date) VALUES (4, 2, 9, 'CPU', 'AMD Ryzen', 170.99, '2022-09-12 09:20', '2022-11-21 09:45');
INSERT INTO product (id, seller_id, category_id, name, description, start_price, start_date, end_date) VALUES (5, 2, 6, 'Ring', 'Gold Ring', 79.99, '2022-12-10 17:00', '2023-01-10 18:00');
INSERT INTO product (id, seller_id, category_id, name, description, start_price, start_date, end_date) VALUES (6, 2, 11, 'Blanket', 'Wool', 20.25, '2022-03-18 12:30', '2022-03-26 13:00');
INSERT INTO product (id, seller_id, category_id, name, description, start_price, start_date, end_date) VALUES (7, 2, 12, 'Chainsaw', 'STIHL', 550.99, '2022-06-23 03:00', '2022-07-29 03:00');
INSERT INTO product (id, seller_id, category_id, name, description, start_price, start_date, end_date) VALUES (8, 3, 10, 'Mobile Phone', 'Samsung', 800.25, '2022-09-05 10:10', '2022-11-06 23:55');

INSERT INTO product_image (id, product_id, image_url) VALUES(1, 1, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/jvcf7clhvzyavyopsi9n/revolution-5-womens-road-running-shoes-hC41Vf.png');
INSERT INTO product_image (id, product_id, image_url) VALUES(2, 1, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/u7khoqev6hy2xgsllrnb/revolution-5-road-running-shoes-szF7CS.png');
INSERT INTO product_image (id, product_id, image_url) VALUES(3, 2, 'https://www.diamondcomputers.co.uk/132-large_default/mouse-keyboard-genius-keyboard-usb-desktop.jpg');
INSERT INTO product_image (id, product_id, image_url) VALUES(4, 4, 'https://cdn.vox-cdn.com/thumbor/U-Odug3YSBUq7R_v6h7loTNQcDE=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16331109/3rd_Gen_Ryzen__1_.jpg');
INSERT INTO product_image (id, product_id, image_url) VALUES(5, 7, 'https://stihlusa-images.imgix.net/Product/2951/ms180.png?w=710&h=532&fit=fill&format=auto&fill=solid');
INSERT INTO product_image (id, product_id, image_url) VALUES(6, 8, 'https://www.businessinsider.in/photo/81411871/best-samsung-mobile-phones-in-india.jpg?imgsize=176930');