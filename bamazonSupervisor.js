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
            choices: ["View Product Sales by Department", "Create New Department","Close"]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.options === "View Product Sales by Department") {
                viewProductSalesDept();
            } else if (answer.options === "Create New Department") {
                creatNewDept();
            } else if (answer.options === "Close") {
                close();
            } 

        });
    
}


function viewProductSalesDept(){
  table = new Table({
        head: ["Department id", "Department Name", "Over Head Costs", "Product Sales", "Total Profits"]

    });
  
     var query = "select department_id,department_name,over_head_costs,SUM(product_sales) AS Product_sales,(over_head_costs-SUM(product_sales)) AS Total_profits ";
      query += "FROM products  JOIN departments USING(department_name) ";
      query += "GROUP BY departments.department_name,department_id,over_head_costs ORDER BY department_id ";

      connection.query(query, function(err, res) { 
        
        for (var i = 0; i < res.length; i++) {
            // table is an Array, so you can `push`, `unshift`, `splice` and friends 
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].Product_sales, res[i].Total_profits]);
        }
        console.log("-----------------------------------");
        console.log(table.toString());        
        start();
});

}


function creatNewDept(){

	inquirer
        .prompt([{
                name: "deptName",
                type: "input",
                message: "What is the department name you would like to add?"
            },
            {
                name: "overhead_cost",
                type: "input",
                message: "What is the overhead cost would you like to add your department in?"
            }
        ])
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO departments SET ?", {                    
                    department_name: answer.deptName,
                    over_head_costs: answer.overhead_cost
                },
                function(err) {
                    if (err) throw err;
                    console.log("Your department is created successfully!");
                   start();
                }
            );
        });

}

function close(){
	connection.end();
}