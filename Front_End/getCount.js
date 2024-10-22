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