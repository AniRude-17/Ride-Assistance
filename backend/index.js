const mysql = require("mysql");


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"assist"
})


const express = require('express');  
const app = express(); 
const PORT = 5000; 

app.use(express.json());
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("SERVER ON") 
    else 
        console.log("ERROR", error); 
    } 
); 


app.get('/shareRide/:ride_id', (req,res)=>{
    ride_id=req.params.ride_id;
    q='update rides set is_shared=1 where ride_id='+ride_id+';';
    ride_id=req.params.ride_id;
    db.query(q, (err,result)=>{

        if(err)
            return res.json(err);

        console.log("shareRide Working",result);
        res.send("Ride Shared with link  on /getRideDetails/"+ride_id);
    })

})


app.get('/getRideDetails/:ride_id', (req,res)=>{

    ride_id=req.params.ride_id;


    q='select * from rides where ride_id='+ride_id+' and is_shared=1;';
    db.query(q, (err,result)=>{

        if(err)
            return res.json(err);

        console.log("getRideDetails Working",result);
        res.send(result);
    })
})


app.post('/listSharedData', (req,res)=>{

    
    is_admin=req.body.admin;
    if(is_admin!=1)
        return res.send("Not Admin");



    q='select * from rides where is_shared=1;';
    db.query(q, (err,result)=>{
        if(err)
            return res.json(err);

        console.log("listSharedData Working",result);
        res.send(result);
    })
})


app.get('endRide/:ride_id', (req,res)=>{

    ride_id=req.params.ride_id;
    // end ride using socket and db
    // func to deactivate ride 

    res.send("Ride Ended");
})





app.get('/updateLocation/:ride_id', (req,res)=>{
    ride_id=req.params.ride_id;



    res.send("Location Updated");
})












