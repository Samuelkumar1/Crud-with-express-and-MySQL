const express = require('express');
const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const path = require('path');
const methodOverride = require('method-override');
const app = express();

app.use(methodOverride("_method"));
app.use(express.urlencoded(extended=true));
//setup for views engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

//connecting node to sql
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"users",
    password:"samuel123"
})

//home route
app.get("/",(req,res)=>{
   

    try {
        let q = 'SELECT count(*) FROM instagram';
           
            connection.query(q,(err,result)=>{
                if (err)  throw err; 
                // console.log(result[0]['count(*)']);
                let count = result[0]['count(*)'];
                res.render("home.ejs",{count})
            })
        } catch (error) {
            console.log(error);
            res.send("Can't fetch the data...")
        }
})

app.listen(8080,(req,res)=>{
    console.log("Listening on port 8080");  
})
//user route

app.get("/users",(req,res)=>{
   

    try {
        let q = 'SELECT * FROM instagram';
           
            connection.query(q,(err,result)=>{
                if (err)  throw err; 
                // console.log(result[0]['count(*)']);
                let users = result;
                // console.log(users);
                res.render("users.ejs",{users})
            })
        } catch (error) {
            console.log(error);
            res.send("Can't fetch the data...")
        }
})

//change route(Select one option for edit)
app.get("/users/:id/selectone",(req,res)=>{
    const {id}= req.params;
    let q = `SELECT * FROM instagram WHERE id='${id}'`;
    try {
        
        connection.query(q,(err,result)=>{
            if(err) throw err;
           let user = result[0];
            res.render("selectOne.ejs",{user});
        })

    } catch (error) {
       res.send(" failed to edit Name ! Try again.");
        
    }

})

//Edit Name route
    app.get("/users/:id/editName",(req,res)=>{
        const {id}= req.params;
        let q = `SELECT * FROM instagram WHERE id='${id}'`;
        try {
            
            connection.query(q,(err,result)=>{
                if(err) throw err;
               let user = result[0];
                res.render("editName.ejs",{user});
            })

        } catch (error) {
           res.send("Edit failed! Try again.");
            
        }
      
    })
     //Update Name(db) route
     app.patch("/users/:id",(req,res)=>{
   
        const {id}=req.params;
        const {Name:newName,password} = req.body;
        let q = `SELECT * FROM instagram WHERE id='${id}'`;
        try {
            
            connection.query(q,(err,result)=>{
                if(err) throw err;
                let user = result[0];
                if(password==user.password){
                   let q2 = `UPDATE instagram set Name='${newName}' WHERE id='${id}'`;

                   connection.query(q2,(err,result)=>{
                    if(err) throw err;
                    res.redirect("/users");

                   })

                }
                else{
                    res.send("Password is inCorrect.")
                }
            })

        } catch (error) {
            res.send("can't find user with this id")
            
        }
    })

    //Change Password route
    
    app.get("/users/:id/changePassword",(req,res)=>{
        const {id}= req.params;
        let q = `SELECT * FROM instagram WHERE id='${id}'`;
        try {
            
            connection.query(q,(err,result)=>{
                if(err) throw err;
               let user = result[0];
                res.render("changePassword.ejs",{user});
            })

        } catch (error) {
           res.send("Edit failed! Try again.");
            
        }
      
    })

    // update Password
    app.patch("/users/:id/changePassword",(req,res)=>{
   
        const {id}=req.params;
        const {password,newPassword} = req.body;
        let q = `SELECT * FROM instagram WHERE id='${id}'`;
        try {
            
            connection.query(q,(err,result)=>{
                if(err) throw err;
                let user = result[0];
                if(password==user.password){
                   let q2 = `UPDATE instagram set password='${newPassword}' WHERE id='${id}'`;

                   connection.query(q2,(err,result)=>{
                    if(err) throw err;
                    res.redirect("/users");

                   })

                }
                else{
                    res.send("Password is inCorrect.")
                }
            })

        } catch (error) {
            console.log(error);
            res.send("can't find user with this id")
            
        }
    })




    //Edit Email Route
    app.get("/users/:id/editEmail",(req,res)=>{
        const {id}= req.params;
        let q = `SELECT * FROM instagram WHERE id='${id}'`;
        try {
            
            connection.query(q,(err,result)=>{
                if(err) throw err;
               let user = result[0];
                res.render("editEmail.ejs",{user});
            })

        } catch (error) {
           res.send("Edit failed! Try again.");
            
        }
      
    })

    //Update Email(db)
    app.patch("/users/:id/email",(req,res)=>{
   
        const {id}=req.params;
        const {Email:newEmail,password} = req.body;
        let q = `SELECT * FROM instagram WHERE id='${id}'`;
        try {
            
            connection.query(q,(err,result)=>{
                if(err) throw err;
                let user = result[0];
                if(password==user.password){
                   let q2 = `UPDATE instagram set Email='${newEmail}' WHERE id='${id}'`;

                   connection.query(q2,(err,result)=>{
                    if(err) throw err;
                    res.redirect("/users");

                   })

                }
                else{
                    res.send("Password is inCorrect.")
                }
            })

        } catch (error) {
            res.send("can't find user with this id")
            
        }
    })



   
//getting the fake users
let newRandomUser=()=>{
    return [
      faker.string.uuid(),
      faker.internet.userName(),
       faker.internet.email(),
      faker.internet.password(),
    ];
  }

// try {
//     let q = "INSERT INTO instagram(id,Name,Email,password) VALUES ?";

//     let data =[];
//      for (let index = 1; index <=100; index++) {
//       data.push(newRandomUser());
        
//     };

//     connection.query(q,[data],(err,result)=>{
//         if (err)  throw err; 
        
//         console.log(result);
//     })
// } catch (error) {
    
//     console.log(error);
// }

// connection.end();
