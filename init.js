const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

 main()
 .then(()=>{
    console.log("connection successful");
 }).catch((err)=>{
    console.log(err);
 })

 async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsApp")
 }


 let allChats = [
    {
        from : "neha",
     to : "priya",
     msg : "send me your exam sheets",
     created_at : new Date()
    },
    {from : "Rohit",
     to : "Raj",
     msg : "How are you?",
     created_at : new Date()
    },
    {
        from : "Raju",
     to : "Bheem",
     msg : "Where is chota bheem?",
     created_at : new Date()
    },
    {
        from : "Krishna",
     to : " Radha",
     msg : "where are you?",
     created_at : new Date()
    },
    {
        from : "veer",
     to : "kal",
     msg : "Where is my lunch box?",
     created_at : new Date()
    },
    {
        from : "amit",
     to : "sunita",
     msg : " I am waiting for you",
     created_at : new Date()
    },
    {from : "raj",
     to : "jai",
     msg : " visit my home",
     created_at : new Date()
    },
     {
        from : " farhan",
     to : "farzana",
     msg : " exam is near",
     created_at : new Date()
     },
     {
        from : "tanu",
     to : "farhan",
     msg : " I am not well",
     created_at : new Date()
     },
 ]

 Chat.insertMany(allChats);

  