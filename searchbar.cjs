const express=require('express') 
const {connectToDb, getDb} =require('./dbconnection.cjs')
const  bodyParser = require('body-parser')
const {ObjectId}=require('mongodb')
const app=express()
app.use(bodyParser.json())
connectToDb(function(error){
    if(error)
     {
        response.json(error)
     }
     else{
         const port=process.env.PORT || 5000
         app.listen(port)
         db=getDb()
        }

 })


   
   



