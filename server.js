console.log("begin")// app.js
const express = require('express');
const {createOrder } = require('./db');

const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());




// Example route
app.get('/', (req, res) => {
    res.send('Hello Erica');
});
app.post('/submit', async (req, res) => {
    const { number, type, size,flavor,icing, icingColor, fillingSize, fillingFlavor, writingInput, writingColorInput, decorationOption } = req.body;
    
    console.log(number, type, size, flavor, icing, icingColor, fillingSize, fillingFlavor, writingInput, writingColorInput, decorationOption);

    try {
       await createOrder(number,type, size,flavor,icing,icingColor, fillingSize, fillingFlavor, writingInput, writingColorInput, decorationOption);
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