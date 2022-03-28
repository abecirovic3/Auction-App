DELETE FROM product_image;

DELETE FROM product;

ALTER TABLE product
    ADD seller_id BIGINT;

ALTER TABLE product
    ALTER COLUMN seller_id SET NOT NULL;

ALTER TABLE product
    ADD CONSTRAINT FK_PRODUCT_ON_SELLER FOREIGN KEY (seller_id) REFERENCES app_user (id);

INSERT INTO product (id, seller_id, name, description, start_price, start_date, end_date) VALUES (1, 1, 'Running shoes', 'Nike', 120.99, '2022-03-10', '2022-04-10');
INSERT INTO product (id, seller_id, name, description, start_price, start_date, end_date) VALUES (2, 1, 'Keyboard', 'Genius', 15.50, '2022-05-20', '2022-08-10');
INSERT INTO product (id, seller_id, name, description, start_price, start_date, end_date) VALUES (3, 1, 'Monitor', 'ASUS', 150.99, '2022-05-10', '2022-05-16');
INSERT INTO product (id, seller_id, name, description, start_price, start_date, end_date) VALUES (4, 2, 'CPU', 'AMD Ryzen', 170.99, '2022-09-12', '2022-11-21');
INSERT INTO product (id, seller_id, name, description, start_price, start_date, end_date) VALUES (5, 2, 'Ring', 'Gold Ring', 79.99, '2022-12-10', '2023-01-10');
INSERT INTO product (id, seller_id, name, description, start_price, start_date, end_date) VALUES (6, 2, 'Blanket', 'Wool', 20.25, '2022-03-18', '2022-03-26');
INSERT INTO product (id, seller_id, name, description, start_price, start_date, end_date) VALUES (7, 2, 'Chainsaw', 'STIHL', 550.99, '2022-06-23', '2022-07-29');
INSERT INTO product (id, seller_id, name, description, start_price, start_date, end_date) VALUES (8, 3, 'Mobile Phone', 'Samsung', 800.25, '2022-09-05', '2022-11-06');

INSERT INTO product_image (id, product_id, image_url) VALUES(1, 1, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/jvcf7clhvzyavyopsi9n/revolution-5-womens-road-running-shoes-hC41Vf.png');
INSERT INTO product_image (id, product_id, image_url) VALUES(2, 1, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/u7khoqev6hy2xgsllrnb/revolution-5-road-running-shoes-szF7CS.png');
INSERT INTO product_image (id, product_id, image_url) VALUES(3, 2, 'https://www.diamondcomputers.co.uk/132-large_default/mouse-keyboard-genius-keyboard-usb-desktop.jpg');
INSERT INTO product_image (id, product_id, image_url) VALUES(4, 4, 'https://cdn.vox-cdn.com/thumbor/U-Odug3YSBUq7R_v6h7loTNQcDE=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16331109/3rd_Gen_Ryzen__1_.jpg');
INSERT INTO product_image (id, product_id, image_url) VALUES(5, 7, 'https://stihlusa-images.imgix.net/Product/2951/ms180.png?w=710&h=532&fit=fill&format=auto&fill=solid');
INSERT INTO product_image (id, product_id, image_url) VALUES(6, 8, 'https://www.businessinsider.in/photo/81411871/best-samsung-mobile-phones-in-india.jpg?imgsize=176930');