const mysql = require("mysql");


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"assist"
})
const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  };



const endPoint="http://localhost:5000/";

const express = require('express');  
const app = express(); 
const PORT = 5000; 

app.use(express.json());
app.set('json spaces', 2)
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("SERVER ON") 
    else 
        console.log("ERROR", error); 
    } 
); 


app.post('/ride/share', (req,res)=>{
    ride_id=req.body.ride_id;
    const q = 'UPDATE rides SET is_shared = 1 WHERE ride_id = ?;';
    db.query(q, [ride_id], (err,result)=>{

        if(err)
            return res.json(err);

        console.log("shareRide Working",result);
        res.send("Link Generated your link is : "+endPoint+"ride/"+ride_id);
    })
})



app.get('/ride/:ride_id', (req,res)=>{

    ride_id=req.params.ride_id;
    const q='SELECT * FROM rides WHERE ride_id = ?;';

    db.query(q, [ride_id], (err,result)=>{

        if(err)
            return res.json(err);
        console.log("getRideDetails Working",result);
        //var currentPosition=getCurrentLocation(); //start websocket
        res.json(result);
    })
})


app.post('/ride/admin', (req,res)=>{

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




app.get('/ride/end/:ride_id', (req,res)=>{

    ride_id=req.params.ride_id;
    const q='UPDATE rides SET is_ongoing = 0, time_end = ? WHERE ride_id = ?;';
    var currentTime=getCurrentTime();
    db.query(q, [currentTime,ride_id],  (err,result)=>{
        if(err)
            return res.json(err);

        console.log("endRide Working",result);
        res.send("Ride Ended");
    })
})


app.get('/ride/user/:user_id', (req,res)=>{

    user_id=req.params.user_id;
    const q='SELECT * FROM rides WHERE user_id = ?;';
    db.query(q, [user_id], (err,result)=>{
        if(err)
            return res.json(err);

        console.log("list user rides Working",result);
        res.send(result);
    })
})




app.get('/updateLocation/:ride_id', (req,res)=>{
    ride_id=req.params.ride_id;

    res.send("Location Updated");
})












