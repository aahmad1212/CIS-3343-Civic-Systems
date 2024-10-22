
document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
 
    // Get the value from the input field
    const customer_ID = document.getElementById('customer_ID').value;
   const numberInput = document.getElementById('numberInput').value;
   const employeeInput = document.getElementById('employeeInput').value;
   const typeInput = document.getElementById('typeInput').value;
   const flavorInput = document.getElementById('flavorInput').value;
   const icingInput = document.getElementById('icingInput').value;
   var icingColorInput = document.getElementById('icingColorInput').value;
   const fillingSizeInput = document.getElementById('fillingInput').value;
   var fillingFlavorInput = document.getElementById('fillingFlavorInput').value;
   const writingInput = document.getElementById('writingInput').value;
   var writingColorInput = document.getElementById('writingColorInput').value;
   const decorationOption = document.getElementById('decorationOption').value;
    var sizeInput;
   if (typeInput=== "Round") {
        sizeInput=document.getElementById('roundSize').value;
   }
   else if (typeInput=== "Sheet") {
    sizeInput=document.getElementById('sheetSize').value;
    }
    else  {
        sizeInput='None';
        }

   if (fillingSizeInput==="None"){
    fillingFlavorInput = "None";
   }
   if (icingInput==="None"){
    icingColorInput = "None";
   }
   if (writingInput ==="No"){
    writingColorInput = "None";
   }
   
   var decorationArray = [ ]
   var checkboxes = document.querySelectorAll('.firstClass');
    checkboxes.forEach((inputVariable) => { 
        if (inputVariable.checked) {
            decorationArray.push(inputVariable.value)
        }})
  
   console.log(checkboxes);
   
   // Send the value to the server using Fetch API
   try {
       const response = await fetch('http://localhost:3000/submit', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ customer_ID: customer_ID, number: numberInput, type: typeInput, size: sizeInput, flavor: flavorInput, icing: icingInput, icingColor: icingColorInput, fillingSize: fillingSizeInput, fillingFlavor: fillingFlavorInput, writingInput: writingInput, writingColorInput: writingColorInput, decorationOption: decorationOption, decorationArray: decorationArray, employeeInput: employeeInput })

       });

       const result = await response.json();
       console.log(result.message);
   } catch (error) {
       console.error('Error:', error);
   }
});

