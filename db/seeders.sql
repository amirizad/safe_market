INSERT INTO `chuckitdb`.`users`
(`username`,`email`,`password`,`role`,`age`,`zip`,`phone`,`user_image_url`,`fname`,`lname`,`verification_code`,`createdAt`, `updatedAt`)
VALUES('test1', 'test1@test1.com', '$2a$10$ehLyvD.vTC1fTZD5JfKMAu2lyv/Paqwf2KLYhD.7e6b2FqrcAq2OC', 'user', '34', '90803', '5625633567', 'https://cdn.filestackcontent.com/pHtjny1tQqOY44A0A40s','first1','last1','1','2017-08-24 12:00:00','2017-08-24 12:00:00'),
('test2', 'test21@test2.com', '$2a$10$d888l6s6bdlZ9edj6gli7.uNwQuQIUJaStupmp7CYiuJmEp1Ny7RS', 'user', '25', '90802', '5625633567', 'https://cdn.filestackcontent.com/pHtjny1tQqOY44A0A40s','first2','last2','1','2017-08-24 12:00:00','2017-08-24 12:00:00'),
('test3', 'test3@test3.com', '$2a$10$ehLyvD.vTC1fTZD5JfKMAu2lyv/Paqwf2KLYhD.7e6b2FqrcAq2OC', 'user', '52', '90815', '2135633567', 'https://cdn.filestackcontent.com/pHtjny1tQqOY44A0A40s','first3','last3','1','2017-08-24 12:00:00','2017-08-24 12:00:00'),
('test4', 'test4@test4.com', '$2a$10$ehLyvD.vTC1fTZD5JfKMAu2lyv/Paqwf2KLYhD.7e6b2FqrcAq2OC', 'user', '44', '92697', '9495111567', 'https://cdn.filestackcontent.com/pHtjny1tQqOY44A0A40s','first4','last4','1','2017-08-24 12:00:00','2017-08-24 12:00:00'),
('test5', 'test5@test5.com', '$2a$10$ehLyvD.vTC1fTZD5JfKMAu2lyv/Paqwf2KLYhD.7e6b2FqrcAq2OC', 'user', '19', '92705', '714563222', 'https://cdn.filestackcontent.com/pHtjny1tQqOY44A0A40s','first5','last5','1','2017-08-24 12:00:00','2017-08-24 12:00:00');

INSERT INTO `chuckitdb`.`items`
(`title`,`description`,`category`,`item_image_url`,`quantity`,`price`,`unit_type`,`barter_ind`,`buyer_sale_confirm`,`seller_sale_confirm`,`seller_rating`,`UserId`,`createdAt`, `updatedAt`)
VALUES('phone','apple iphone 7','Electronics',null,1,50,'Flat Rate',0,0,1,null,1,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
('lawnmower','honda lawnmower 2010','Equipment',null,1,100,'Flat Rate',0,1,1,4,1,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
('bike','bmx dirt bike 2000','electronics',null,1,80,'Flat Rate',0,0,0,null,2,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
('futon','futon like new','Furniture',null,1,75,'Flat Rate',0,0,0,null,2,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
('jacket','mens leather jacket size 34','Clothes',null,1,60,'Flat Rate',0,1,1,3,3,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
('42'' TV','Samsung HDTV 42 inch 2017','Electronics',null,1,200,'Flat Rate',0,0,1,null,3,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
('handy man','Reliable handyman good quality work ','Servies',null,2,40,'Per Hour',0,0,0,null,3,'2017-08-24 12:00:00','2017-08-24 12:00:00');

INSERT INTO `chuckitdb`.`offers`
(`ItemId`,`offer_amt`,`barter_ItemId`,`offer_accepted_ind`,`offer_accepted_dtm`,`UserId`,`createdAt`, `updatedAt`)
VALUES(1,50,null,0,null,4,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(2,90,null,0,null,5,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(2,100,null,1,'2017-08-24 17:00:00',4,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(3,75,null,0,null,2,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(3,85,null,1,'2017-08-24 10:00:00',5,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(3,80,null,0,null,1,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(5,50,null,0,null,4,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(5,55,null,1,'2017-08-24 14:00:00',4,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(6,200,null,1,'2017-08-24 23:00:00',4,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(5,50,null,0,null,4,'2017-08-24 12:00:00','2017-08-24 12:00:00');

INSERT INTO `chuckitdb`.`messages`
(`ItemId`,`FromId`,`ToId`,`message_text`,`read_ind`,`createdAt`, `updatedAt`)
VALUES(2,5,1,'Will you take less than asking',1,'2017-08-24 12:00:00','2017-08-24 12:00:00'),
(2,1,5,'No',1,'2017-08-24 12:00:00','2017-08-24 12:01:00'),
(3,4,2,'Are you available this Sat for pick up',1,'2017-08-24 12:00:00','2017-08-24 12:02:00'),
(3,2,4,'Yes',1,'2017-08-24 12:00:00','2017-08-24 12:03:00'),
(4,4,2,'Does it have stains?',1,'2017-08-24 12:00:00','2017-08-24 12:04:00'),
(4,2,4,'Yes',1,'2017-08-24 12:00:00','2017-08-24 12:05:00'),
(6,2,3,'Does it have any defects?',1,'2017-08-24 12:00:00','2017-08-24 12:06:00'),
(6,3,2,'No',1,'2017-08-24 12:00:00','2017-08-24 12:07:00'),
(6,2,3,'Do you have original box?',1,'2017-08-24 12:00:00','2017-08-24 12:08:00'),
(7,4,3,'Do you do plaster repairs?',1,'2017-08-24 12:00:00','2017-08-24 12:09:00');

update chuckitdb.items
set buyer_sale_confirm=0, seller_sale_confirm=0
where id<>2;

update chuckitdb.offers
set offer_accepted_ind=0, offer_accepted_dtm=null
where itemId<>0;

Update chuckitdb.items 
set item_image_url="http://lorempixel.com/output/sports-q-c-640-480-5.jpg"
where id=3;

update chuckitdb.items
set item_image_url="http://lorempixel.com/output/technics-q-c-640-480-7.jpg"
where id=1;

update chuckitdb.items
Set item_image_url="https://thumb9.shutterstock.com/display_pic_with_logo/79181/131401952/stock-photo-red-lawn-mower-131401952.jpg"
where id=2;


update chuckitdb.items
set item_image_url="http://lorempixel.com/output/fashion-q-c-640-480-3.jpg"
where id=5;

update chuckitdb.items
set item_image_url="https://thumb1.shutterstock.com/display_pic_with_logo/680755/288200936/stock-photo-yukata-and-futon-of-japan-288200936.jpg"
where id=4;

update chuckitdb.items
set item_image_url="http://lorempixel.com/output/technics-q-c-640-480-9.jpg"
where id=5;

update chuckitdb.items
set item_image_url="https://thumb9.shutterstock.com/display_pic_with_logo/151216/264151898/stock-photo-handyman-with-tools-264151898.jpg"
where id=7;

INSERT INTO `chuckitdb`.`items`
(`title`,`description`,`category`,`item_image_url`,`quantity`,`price`,`unit_type`,`barter_ind`,`buyer_sale_confirm`,`seller_sale_confirm`,`seller_rating`,`UserId`,`createdAt`, `updatedAt`)
VALUES('Beats Headphones', 'Solo 3 Wireless', 'Electronics', 'https://images-na.ssl-images-amazon.com/images/I/41fnjLZS5BL.jpg', '1', '100.00', 'Flat Rate', '0', '0', '0', NULL, 1, '2017-08-24 12:00:00', '2017-08-24 12:00:00'),
('Power Washer', 'Sun Joe SPX4000 like new', 'Equipment', 'https://i5.walmartimages.com/asr/f83efaf5-f338-4588-a0f6-d2698df1dd2b_1.fd2c400fb6ace07d9bdcf4a315e029f2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF', 1, '90.00', 'Flat Rate', '0', '0', '0', NULL, 1,'2017-08-24 12:00:00', '2017-08-24 12:00:00'),
('Vintage Bike', 'Schwinn Stingray Banana Seat', 'Equipment', 'https://i.pinimg.com/736x/d8/fa/8e/d8fa8ebc1dd7d30fffb98457ede953ee--banana-seat-bike-vintage-bicycles.jpg', '1', '150.00', 'Flat Rate', '0', '0', '0', NULL, 2,'2017-08-24 12:05:00', '2017-08-24 12:00:00'),
('Night Stand', 'Callie 3 drawer minor scratches', 'Furniture', 'https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&imageId=1152192-847__1&recipeName=350', '1', '300.00', 'Flat Rate', '0', '0', '0', NULL, 2, '2017-08-24 12:04:00', '2017-08-24 12:00:00'),
('Women\'s Romper', 'Lulu Navy Blue never worn size M', 'Clothes', 'https://cdn3.lulus.com/images/product/large/2421912_396702.jpg', '1', '45.00', 'Flat Rate', '0', '0', '0', NULL, 3, '2017-08-24 12:03:00', '2017-08-24 12:00:00'),
('Refurbished IPad', 'iPad 2 32GB WiFi', 'Electronics', 'https://cdn3.bigcommerce.com/s-ndqvi4q/products/268/images/1040/zambezi-ipad234_black-standard__43881.1434157444.500.659.jpg?c=2', '1', '148.00', 'Flat Rate', '0', '0', '0', NULL, 4, '2017-08-24 12:02:00', '2017-08-24 12:00:00'),
('Plumber', 'Apprentice plumber cheap drain clear', 'Servies', 'https://thumbs.dreamstime.com/b/plumber-crack-142669.jpg', '2', '35.00', 'Per Hour', '0', '0', '0', NULL, 5, '2017-08-24 12:01:00', '2017-08-24 12:00:00');






