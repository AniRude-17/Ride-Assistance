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


app.get('/shareRide', (req,res)=>{

    ride_id=req.query.ride_id;
    // generate shareble link
    link="temp";
    res.send({"Link":link});

})


app.get('/getRideDetails/:ride_id', (req,res)=>{

    ride_id=req.params.ride_id;
    // get ride details from traveller using socket adn db
    var onGoing=true;
    driver_id=1;
    source=1;
    destination=432;
    currLoc=123;

    details = {"ride_id":ride_id,"driver_id":driver_id,"source":source,"destination":destination,"Current Location":currLoc};
    
    if (onGoing==false)
        res.send("Link Expired")
    res.send(details);

})


app.post('/listSharedData', (req,res)=>{
    if(req.body.admin===1) {
        //fetch all shared data from db
        data={"1":"temp1","2":"temp2","3":"temp3"};
        res.send(data);
    }
    else{
        //fetch shared data of user_id from db
        user_id=req.body.user_id;
        data={"1":"temp1","2":"temp2","3":"temp3vfsdgvgggg","user_id":user_id};
        res.send(data);
    }


})


app.get('endRide/:ride_id', (req,res)=>{

    ride_id=req.params.ride_id;
    // end ride using socket and db
    // func to deactivate ride 

    res.send("Ride Ended");
})














