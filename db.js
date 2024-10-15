// db.js
const sql = require('mssql');


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




async function createOrder(number,type,size,flavor,icing, icingColor, fillingSize, fillingFlavor, writingInput, writingColorInput, decorationOption) {
    try {

        await sql.connect(config);
        console.log('Connected to the database!');
        
        // Perform a test query
        const result = await sql.query`INSERT INTO CUSTOM_ORDERS (ORDER_ID, TYPE, SIZE, FLAVOR, ICING, ICING_COLOR, FILLING_SIZE, FILLING__FLAVOR, WRITING, WRITING_COLOR, DECORATIONS) VALUES(${number}, ${type},${size},${flavor},${icing},${icingColor}, ${fillingSize}, ${fillingFlavor}, ${writingInput}, ${writingColorInput}, ${decorationOption})`;
        
        console.log(result.recordset); // Output the results
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}


module.exports = {
    createOrder,
    sql
};
