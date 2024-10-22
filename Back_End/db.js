// db.js
const sql = require('mssql');
const express = require('express');

const app = express();

const config = {
    user: 'Bradley', // replace with your SQL Server username
    password: '1234', // replace with your SQL Server password
    server: 'localhost', // or 'localhost\\SQLEXPRESS' if you're using SQL Express
    port: 1433,
    database: 'Emily_Bakes_Cake', // replace with your database name
    options: {
        encrypt: false, // use this if you're connecting to Azure SQL Database
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};
function getCurrentSmallDatetime() {
    let now = new Date();
    
    // Get current date parts
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let day = String(now.getDate()).padStart(2, '0');
    let hour = String(now.getHours()).padStart(2, '0');
    let minute = now.getMinutes();

    // Round seconds to nearest minute
    if (now.getSeconds() >= 30) {
        minute++;
    }
    
    // Handle edge case where rounding minute results in next hour
    if (minute === 60) {
        minute = 0;
        hour = String(parseInt(hour) + 1).padStart(2, '0');
    }

    minute = String(minute).padStart(2, '0');
    
    // Format the date as YYYY-MM-DD HH:MM
    return `${year}-${month}-${day} ${hour}:${minute}`
}

async function updateOrderStatus (number2, employeeInput2, statusInput, date) {
    try {

        await sql.connect(config);
        console.log('Connected to the database!');
        var date = getCurrentSmallDatetime();
        var result = await sql.query `UPDATE STATUS SET STATUS = ${statusInput}, EMPLOYEE_ID= ${employeeInput2}, DATE = ${date}  WHERE ORDER_ID = ${number2}`;
        
    }
    catch (err) {
        console.error('Database connection failed:', err);
    }
}

async function getOrder () {

    try {

        await sql.connect(config);
        
        
        var result = await sql.query('SELECT * FROM STATUS');
        return result.recordset;
    }
    catch (err) {
        console.error('Database connection failed:', err);
    }
}

async function getFullOrder () {

    try {

        await sql.connect(config);
        
        
        var result = await sql.query('SELECT * FROM CUSTOMIZED_ORDERS');
        return result.recordset;
    }
    catch (err) {
        console.error('Database connection failed:', err);
    }
}
async function createOrder(customer_ID, number,type,size,flavor,icing, icingColor, fillingSize, fillingFlavor, writingInput, writingColorInput, decorationOption, decorationArray, employeeInput) {
    try {

        await sql.connect(config);
       
        console.log('trying to insert')
        // Perform a test query
        const result = await sql.query`INSERT INTO CUSTOMIZED_ORDERS (ORDER_ID, CUSTOMER_ID, TYPE, SIZE, FLAVOR, ICING, ICING_COLOR, FILLING_SIZE, FILLING_FLAVOR, WRITING, WRITING_COLOR, DECORATIONS) VALUES(${number}, ${customer_ID}, ${type},${size},${flavor},${icing},${icingColor}, ${fillingSize}, ${fillingFlavor}, ${writingInput}, ${writingColorInput}, ${decorationOption})`;
        
        decorationArray.forEach(function(element) {
             var result2 = sql.query`INSERT INTO DECORATION (ORDER_ID, DECORATION_CHOICE) VALUES(${number},${element})`;
        });


        
        var date =getCurrentSmallDatetime();

        const result3 = sql.query`INSERT INTO STATUS (ORDER_ID, EMPLOYEE_ID, STATUS, DATE ) VALUES(${number},${employeeInput}, 'Bakery',${date})`;
        
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

async function createCustomerInfo(customerCount, customerName, emailInput, phoneNumberInput ) {
    try {

        await sql.connect(config);
       
        console.log('trying to insert')
        // Perform a test query
        console.log(customerCount, customerName, emailInput, phoneNumberInput)
        const result = await sql.query`INSERT INTO CUSTOMER_INFO (CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE) VALUES(${customerCount}, ${customerName},${emailInput},${phoneNumberInput})`;
        
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

//THIS IS THE STUFF I ADDED
module.exports = {
    createOrder,getOrder,updateOrderStatus,getFullOrder,createCustomerInfo,
    sql
};
