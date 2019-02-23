var express = require('express');//imports express js
var bodyParser = require('body-parser');//enable the express app to read the incoming body
var logger = require('morgan');//for logging all http request 
var methodOverride = require('method-override')//allows to use put and delete request
var cors = require('cors');//cross origin resource sharing enables ionic to communicate with server
var app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"library",

});
con.connect((err)=>{
    if(err) throw err;
    console.log('connected');
    
    })
    app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.post('/books',(req,res)=>{
    const book=req.body.book
    const due=req.body.due
    const issue=req.body.issue
  const username=req.body.username
    console.log(book,due,issue,username);
    var sql = 'insert into books (book,due,issue,username) values ("'+book+'","'+due+'","'+issue+'","'+username+'")';
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json({
                success:true,
                status:200
            })
            console.log("ho gaya bhai");
        }
    })
 })
 app.post('/delete',(req,res)=>{
    const book=req.body.book
    var sql = 'DELETE FROM books WHERE book = "'+book+'"';
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json({
                success:true,
                status:200
            })
            console.log(result);
        }
        })
}
)
app.get("/display",(req,res)=>{
    var sql= 'select * from books';
    con.query(sql,(err,result)=>{
    if(err){
    console.log(error);
    res.end;
    }
    console.log(result);
    res.json(result);
    });
    })
app.post("/check",(req,res)=>{
        const fp=req.body.fp
        var sql= 'select * from books where username = "'+fp+'"';
        con.query(sql,(err,result)=>{
            if(err){
                console.log(err);
                res.json({
                    success:false,
                    status:400
                })
            }
            else{
                res.json(result)

                console.log(result);
            }
            })
    })
app.post('/pass',(req,res)=>{
      const username=req.body.username
      const password=req.body.password
        console.log(username,password);
        var sql = 'insert into password (username,password) values ("'+username+'","'+password+'")';
        con.query(sql,(err,result)=>{
            if(err){
                console.log(err);
                res.json({
                    success:false,
                    status:400
                })
            }
            else{
                res.json({
                    success:true,
                    status:200
                })
                console.log("ho gaya bhai");
            }
        })
     })
     app.post("/passcheck",(req,res)=>{
         const username=req.body.username
        const pass=req.body.password
        var sql= 'select * from password where (username) = ("'+username+'")';
        con.query(sql,(err,result)=>{
            if(result[0]!=null && result[0].password==pass){
                res.json(result)
                console.log(result);
            }
            else{
               
                console.log(err);
                res.json({
                    success:false,
                    status:400
                })
            }
            })
    })
    app.post("/regcheck",(req,res)=>{
        const username=req.body.username
       const password=req.body.password
       var sql= 'select * from password where (username) = ("'+username+'")';
       con.query(sql,(err,result)=>{
           if(result[0]==null){
            var sql = 'insert into password (username,password) values ("'+username+'","'+password+'")';
            con.query(sql,(err,result)=>{
                if(err){
                    console.log(err);
                    res.json({
                        success:false,
                        status:400
                    })
                }
                else{
                    res.json({
                        success:true,
                        status:200
                    })
                    console.log("ho gaya bhai");
                }
            })
           }
           else{
              
               console.log(err);
               res.json({
                   success:false,
                   status:500
               })
           }
           })
   })
app.listen(process.env.PORT||3000);