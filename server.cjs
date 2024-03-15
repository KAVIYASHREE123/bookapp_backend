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
 
 app.post('/signup',function(request,response){
   db.collection('booksdb').insertOne(request.body).then(function(){
       // response.sendFile(Path.join('src/signinpage'))  
        response.status(200).json({
            "status":"you are signed up "
        })
         }).catch(function(){
            response.status(404).json({
                "status":"There's an error "
            })
        
    }) 
 })

 
  app.post('/login',function(request,response){
       const {Name,password}=  request.body;
       // const mail=request.body.Name,request.body.password;
       db.collection('booksdb').findOne({Name,password}).then
       (function(verify){
         if(verify){
            response.json({
            "status":"you are logged in" // response.sendFile(Path.join('src/loginpage'))
           })
         }
         else{
            response.json({
               "status":"invalid"
            })
         }
       })
                                //    here enter the homepage link
         .catch(function(){
            response.status(500).json({
                "status":"email is not there"
            })
    })
 })

// search bar podanum
app.get('/search',async(request,response)=>{
   //     let new_arr=[];
   //  let arr=[];
   //  arr =db.collection('authors').find(request.body.Name)
   //         new_arr = arr.map((ele)=> ele)
     
       let result= await db.collection('authors').find({
          "$or": [{
          name:{$regex:request.body.name}
              
           },
       {
           bookname:{$regex:request.body.bookname}
       }]
       })
         response.json(result);  
      })
