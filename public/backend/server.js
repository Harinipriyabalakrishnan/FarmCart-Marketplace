import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/farmcart")
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

app.get("/", (req,res)=>{
    res.send("FarmCart API Running");
});

app.get("/test",(req,res)=>{
 res.json({message:"MongoDB working"});
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});
