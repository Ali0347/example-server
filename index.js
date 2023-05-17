require('dotenv').config();
const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book')


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery',false);

const connectDB = async ()=>{
    try{
const conn = await mongoose.connect(process.env.MONGO_URL);
console.log(`MongoDB Connected: ${conn.connection.host}`); 
    }
    catch(error){
console.log(error);
process.exit(1);
    }
}


app.get('/',(req,res)=>{

    res.send({title:"Book"});
})





app.get('/add-note',async (req,res)=>{
try{
   await Book.insertMany([
    {
        title: "Sons of Anarchy",
        body : "Body text goes here..."
    },
    {
title: "Games of Thrones",
body: "Body text goes here..."
    }
   ])
}
catch(error){
console.log("err", + error);
}
})


app.get("/books", async(req,res)=>{
    const book = await Book.find();

if(book){
res.json(book);

}
else{
    res.send("Something went wrong.")
}

});


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on port ${ PORT }`);
       })
})