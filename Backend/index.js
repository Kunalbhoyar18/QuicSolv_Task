const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const  mysql  = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());




// database Connection


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb',
    port:3306
})


// check database connection

db.connect(err=>{
    if(err) {console.log(err,'err');}
    console.log('database connected!')
})


// get all data 


app.get('/contact',(req,res) => {
   

    let qr = `select * from contact`;
    db.query(qr,(err,result) => {

        if(err){
            console.log(err,"errors");
        }
        if(result.length>0){
            res.send({
                message:"all user data",
                data:result
            })
        }
    })
})


// post data 

app.post('/contact',(req,res) => {

    console.log(req.body,'createdata');
    
    let name = req.body.name;
    let email = req.body.email;
    let contactnumber = req.body.contactnumber;
    let address = req.body.address;
    let id = null;

    let qr = `insert into contact(name,email,contactnumber,address) values('${name}','${email}','${contactnumber}','${address}')`;

    console.log(qr,'qr')


    db.query(qr,(err,result) => {
        if(err) {
            console.log(err,"error");}
            console.log(result,"result")
            res.send({
                message:'data inserted!',
            })
       
    });
});



app.listen(3000,()=>{console.log('server running on 3000')});