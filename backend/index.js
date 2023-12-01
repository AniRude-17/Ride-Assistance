const express = require('express'); 
  
const app = express(); 
const PORT = 5000; 
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("SERVER ON") 
    else 
        console.log("ERROR", error); 
    } 
); 



