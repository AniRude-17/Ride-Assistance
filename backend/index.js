const mysql = require("mysql");


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"assist2"
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
    console.log(req);
    // res.send(req);
    ride_id=req.body.ride_id;
    const q = 'UPDATE ongoingrides SET is_shared = 1 WHERE ride_id = ?;';
    db.query(q, [ride_id], (err,result)=>{

        if(err)
            return res.json(err);

        console.log("shareRide Working",result);
        res.send("Link Generated your link is : "+endPoint+"ride/"+ride_id);
    })
})


app.post('/testing' , (req,res)=>{
    res.send(req.body);
})


app.get('/ride/:ride_id', (req,res)=>{

    ride_id=req.params.ride_id;
    const q='SELECT * FROM ongoingrides WHERE ride_id = ? and is_shared=1;';

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

    q='select * from ongoingrides where rides.is_shared=1 or ongoingrides.is_shared=1;';
    db.query(q, (err,result)=>{
        if(err)
            return res.json(err);

        console.log("listSharedData Working",result);
        res.send(result);
    })
})




app.get('/ride/end/:ride_id', (req, res) => {
    const ride_id = req.params.ride_id;

    const q = 'UPDATE ongoingrides SET end_time = ? WHERE ride_id = ?;';
    const currentTime = getCurrentTime();

    db.query(q, [currentTime, ride_id], (err, result) => {
        if (err) {
            return res.json(err);
        }

        const q1 = 'INSERT INTO rides SELECT * FROM ongoingrides WHERE ride_id = ?;';
        db.query(q1, [ride_id], (err1, result1) => {
            if (err1) {
                return res.json(err1);
            }

            const q2 = 'DELETE FROM ongoingrides WHERE ride_id = ?;';
            db.query(q2, [ride_id], (err2, result2) => {
                if (err2) {
                    return res.json(err2);
                }

                console.log("endRide Working", result2);
                res.send("Ride Ended");
            });
        });
    });
});


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



app.post('/feedback', (req,res)=>{
    ride_id=req.body.ride_id;
    feedback=req.body.feedback;
    const q='insert into feedbacks(ride_id,feedback) values(?,?);';

    db.query(q, [ride_id,feedback], (err,result)=>{
        if(err)
            return res.json(err);

        console.log("feedback Working",result);
        res.send("Feedback Submitted");
    })
}  )


app.post('/feedback/admin', (req,res)=>{

    is_admin=req.body.admin;
    if(is_admin!=1)
        return res.send("Not Admin");

    q='select * from feedbacks;';
    db.query(q, (err,result)=>{
        if(err)
            return res.json(err);

        console.log("listFeedback Working",result);
        res.send(result);
    })
})






