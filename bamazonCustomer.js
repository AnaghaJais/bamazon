var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var table;
var currentPrice;
var totalPrice;
var product;
var stockQuantity;
var sales;
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});
listAndOrder();

function listAndOrder(){
//connection.connect(function(err) {
    //if (err) throw err;
    //console.log("connected as id " + connection.threadId);
    table = new Table({
        head: ["ID", "Product Name", "Department Name", "Price($)", "Stock Quantity","Product Sales"]

    });
    

    connection.query("SELECT * FROM products", function(err, res) {
        
        for (var i = 0; i < res.length; i++) {
            // table is an Array, so you can `push`, `unshift`, `splice` and friends 
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity,res[i].product_sales]);
        }
        console.log("-----------------------------------");
        console.log(table.toString());
        inquirer
            .prompt([{
                    name: "id",
                    type: "input",
                    message: "What is the item ID you want to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many of this item would you like to buy?"
                }
            ])
            .then(function(answer) {

                var query1 = connection.query("select price,product_name,stock_quantity,product_sales from products where item_id=?", [answer.id], function(err, res) {

                    if (err) throw err;

                    for (i = 0; i < res.length; i++) {

                        currentPrice = parseInt(res[i].price);
                        totalPrice = currentPrice * parseInt(answer.quantity);
                        stockQuantity = parseInt(res[i].stock_quantity);
                        product = res[i].product_name;
                        sales=parseInt(res[i].product_sales);
                        
                    }
                    if((parseInt(answer.quantity))<stockQuantity){
                console.log("Your total for " + answer.quantity + " " + product + " is: " + totalPrice);
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: stockQuantity - parseInt(answer.quantity),
                                product_sales:sales+totalPrice
                            },
                            {
                                item_id: answer.id
                            }
                        ],
                        function(err) {
                            if (err) throw err;
                            console.log("Your table was updated successfully!");
                            
                            connection.end();
                        }

                    );
                    }
                    else {
                            console.log("Sorry, insufficient Quanity at this time");
                           //connection.end();
                            listAndOrder();
                         }
                });
            });

    });

}