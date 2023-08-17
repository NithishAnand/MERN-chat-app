const mongoose=require('mongoose');
const mongodb=require('mongodb')
require('dotenv').config();



/*
mongoose.connect('mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.5dfvqpq.mongodb.net/chatAppMern?retryWrites=true&w=majority', ()=>{
    console.log(`Connected to Mongodb Sucessfully.`);
})
*/

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.5dfvqpq.mongodb.net/chatAppMern?retryWrites=true&w=majority`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  


  const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


