var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var table;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

start();

function start() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "Please select one option from given below",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.options === "View products for sale") {
                viewProduct();
            } else if (answer.options === "View low inventory") {
                viewLowInventory();
            } else if (answer.options === "Add to inventory") {
                addInventory();
            } else if (answer.options === "Add new product") {
                addNewProduct();
            } 

        });
}

function viewProduct() {

    table = new Table({
        head: ["ID", "Product Name", "Department Name", "Price($)", "Stock Quantity"]

    });

    connection.query("SELECT * FROM products", function(err, res) {

        for (var i = 0; i < res.length; i++) {
            // table is an Array, so you can `push`, `unshift`, `splice` and friends 
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log("-----------------------------------");
        console.log(table.toString());
        connection.end();
    });
}

function viewLowInventory() {
    table = new Table({
        head: ["ID", "Product Name", "Department Name", "Price($)", "Stock Quantity"]

    });

    connection.query("SELECT * FROM products where stock_quantity<5", function(err, res) {

        for (var i = 0; i < res.length; i++) {
            // table is an Array, so you can `push`, `unshift`, `splice` and friends 
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log("-----------------------------------");
        console.log(table.toString());
        connection.end();
    });
}

function addInventory() {
    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "What is the item ID you want to add,Please enter the ID?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many of this item would you like to add more?"
            }
        ])
        .then(function(answer) {
            var query1 = connection.query("select stock_quantity from products where item_id=?", [answer.id], function(err, res) {

                if (err) throw err;

                for (i = 0; i < res.length; i++) {

                    //currentPrice = parseInt(res[i].price);
                    //totalPrice = currentPrice * parseInt(answer.quantity);
                    stockQuantity = parseInt(res[i].stock_quantity);
                    //product = res[i].product_name;

                }
                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: stockQuantity + parseInt(answer.quantity)
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
            });

        });
}

function addNewProduct() {
    inquirer
        .prompt([{
                name: "productName",
                type: "input",
                message: "What is the product name you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "What department would you like to add your product in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of your product?"
            },
            {
                name: "stock",
                type: "input",
                message: "What is the quantity of the product?"
            }
        ])
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?", {
                    product_name: answer.productName,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function(err) {
                    if (err) throw err;
                    console.log("Your product inventory is created successfully!");
                    connection.end();
                }
            );
        });

}