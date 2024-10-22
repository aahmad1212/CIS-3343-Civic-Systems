console.log("begin")// app.js
const express = require('express');
const {createOrder, getOrder,getFullOrder, updateOrderStatus,createCustomerInfo } = require('./db');

const bodyParser = require('body-parser');
const cors = require('cors');
const { Int } = require('mssql');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.get('/getFullOrder', async (req,res) => {
    try {
        
        var orderInput = await getFullOrder();
       
        res.json({ orderInput });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get the order' });
    }
})

app.get('/getOrder', async (req,res) => {
    try {
        
        var orderInput = await getOrder();
       
        res.json({ orderInput });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get the order' });
    }
})
app.post('/customerInputSubmit', async (req, res) => {
    const {customerCount, customerName, emailInput, phoneNumberInput } = req.body;
    
    
    try {
       await createCustomerInfo(customerCount, customerName, emailInput, phoneNumberInput);
        res.json({ message: 'Number submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to submit number' });
    }
  
});
app.post('/submit', async (req, res) => {
    const { customer_ID, number, type, size,flavor,icing, icingColor, fillingSize, fillingFlavor, writingInput, writingColorInput, decorationOption, decorationArray,employeeInput} = req.body;
    
    
    try {
       await createOrder(customer_ID, number,type, size,flavor,icing,icingColor, fillingSize, fillingFlavor, writingInput, writingColorInput, decorationOption, decorationArray, employeeInput);
        res.json({ message: 'Number submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to submit number' });
    }
  
});

app.post('/updateOrderSubmit', async (req, res) => {
    const { number2, employeeInput2, statusInput} = req.body;
    
    console.log(number2, employeeInput2, statusInput);

    try {
       await updateOrderStatus(number2, employeeInput2, statusInput);
        res.json({ message: 'Number submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to submit number' });
    }
  
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});