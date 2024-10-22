document.getElementById('updateOrderForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const numberInput2 = document.getElementById('numberInput2').value;
   const employeeInput2 = document.getElementById('employeeInput2').value;
   const statusInput = document.getElementById('statusInput').value;
    console.log
   try {
    const response = await fetch('http://localhost:3000/updateOrderSubmit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number2: numberInput2, employeeInput2: employeeInput2, statusInput: statusInput })

    });

    const result = await response.json();
    console.log(result.message);
} catch (error) {
    console.error('Error:', error);
}

});

async function getOrder(){
    try {
        const response = await fetch('http://localhost:3000/getOrder', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        
        const result = await response.json();
        console.log(result);
        return result;

    } catch (error) {
        console.error('Error:', error);
    }
}