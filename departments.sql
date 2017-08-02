USE bamazon;

CREATE TABLE departments (
  department_id INTEGER(2) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL ,
  over_head_costs INTEGER(10) NULL  
);

INSERT INTO
       departments(department_name,over_head_costs)
	   VALUES("Electronics",140000),	         
             ("Computer",70000),
             ("toys",30000),
             ("Health&Household",20000),
			 ("Sports&Outdoors",12000),
             ("Home",50000),
             ("Luggagae",40000),
			 ("Furniture",40000),
             ("Jewelry",100000) ; 	


USE bamazon;


 /*select department_id,departments.department_name,over_head_costs,SUM(product_sales) AS Product_sales, 
 (over_head_costs-SUM(product_sales)) AS Total_profits  FROM products  INNER JOIN 
 departments ON products.department_name=departments.department_name GROUP BY departments.department_name,department_id,over_head_costs;*/
 			 