document.getElementById('addCustomerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const customerName = document.getElementById('customerNameInput').value;
    const emailInput = document.getElementById('emailInput').value;
    const phoneNumberInput = document.getElementById('phoneNumberInput').value;
   
    const customerCount = document.getElementById('customerCount').value;
    try {
        console.log(customerCount);
        const response = await fetch('http://localhost:3000/customerInputSubmit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
           
            body: JSON.stringify({ customerCount: customerCount, customerName: customerName, emailInput: emailInput, phoneNumberInput: phoneNumberInput })
           
        });
 
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Error:', error);
    }
    
})