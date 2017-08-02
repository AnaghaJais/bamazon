DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(2) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,  
  price DECIMAL(10,4) NULL,
  stock_quantity INTEGER(10) NULL  
);

INSERT INTO
       products(product_name,department_name,price,stock_quantity)
	   VALUES("Mac book pro","Electronics",1400,20),
	         ("Samsung Note 7","Electronics",800,30),
             ("iphone 7","Electronics",900,40),
             ("Acer Asper AIO desktop","Computer",649.99,10),
             ("Fisher-Price Baby's First Blocks","toys",19.73,35),
             ("chi Hair Straightener","Health&Household",99.95,5),
			 ("Diamondback bicycles","Sports&Outdoors",1200,4),
             ("Ninja Coffee Bar Glass Carafe System","Home",167.66,10),
             ("High Sierra Loop Backpack","Luggagae",28.90,12),
             ("14k Gold Diamond Earring","Jewelry",359.99,3) ; 			 
			 
 SELECT * FROM bamazon.products;
 
 ALTER TABLE products
ADD product_sales DECIMAL(10,2) DEFAULT 0 ;