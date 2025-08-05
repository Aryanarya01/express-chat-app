const express = require("express");
const app =express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride =require("method-override");
const Chat = require("./models/chat.js");
const { runInContext } = require("vm");
const ExpressError = require("./ExpressError");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

 main()
 .then(()=>{
    console.log("connection successful");
 }).catch((err)=>{
    console.log(err);
 })

 async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsApp")
 }


 
//    Index route
app.get("/chats",asyncWrap(async(req,res)=>{
   let chats = await Chat.find();
   res.render("index",{chats});     
}));

//   Add a new route
app.get("/chats/new",(req,res)=>{
   res.render("new.ejs");
});

//   Create a new chat
app.post("/chats",(req,res)=>{
   let { from, to, msg } =req.body;
   let newChat = new Chat(
      {
         from :from,
         to : to,
         msg : msg ,
         created_at : new Date(),
         
      });
       newChat.save()
       .then((res)=>{
         console.log("Chat saved successfully");
       }).catch((err)=>{
         console.log(err);
       });
       res.redirect("/chats");
});

// async wrap function to handle async errors
function asyncWrap(fn){
   return function(req,res,next){
      fn(req,res,next)
      .catch((err)=>
      next(err));
   }
}

// Show route----NEW-----only for testing if error handling works
// app.get("/chats/:id",asyncWrap (async(req,res,next)=>{
//   let {id} = req.params;
//    let chat = await Chat.findById(id);  
//    if(!chat){
//      next(new ExpressError(404,"Chat not found"));
//    }
//    res.render("edit.ejs",{chat});
// })
// );

// Edit route
app.get("/chats/:id/edit", asyncWrap(async(req,res)=>{
   let {id}= req.params;
   let chat = await Chat.findById(id);
   res.render("edit.ejs",{chat});
}));


// Update route
app.put("/chats/:id",asyncWrap(async(req,res)=>{
   let {id} = req.params;
   let {msg : newMsg} = req.body;
   let updateChat = await Chat.findByIdAndUpdate(id,
      {
         msg : newMsg,
      updated_at: new Date()
   },
      {
         new : true,
         runValidators : true
      });
   console.log(updateChat);
   res.redirect("/chats");
}));


// Destroy route
app.delete("/chats/:id",asyncWrap(async(req,res)=>{
   let{id}= req.params;
  let deletedchat =  await Chat.findByIdAndDelete(id);
  console.log(deletedchat);
  res.redirect("/chats");

}));

app.get("/",(req,res)=>{
    res.send("root is working");
});

 const handleValidationError = (err)=>{
console.log("This is a validation error. Please follow the rules");
console.dir(err.message);
return err;
}

app.use((err,req,res,next)=>{
   console.log(err.name);
   if(err.name === "ValidationError"){
      err = handleValidationError(err);
   }
   next(err);
})

//Error handling middleware
app.use((err,req,res,next)=>{
   const {status = 500, message = "Some error occured"}= err;
   res.status(status).send(message);
});

 app.listen(8080,()=>{
    console.log("Server is listining on port 8080");
 });