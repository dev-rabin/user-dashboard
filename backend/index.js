const express = require("express");
const app = express();
const port = 8001;
const {database} = require("./src/model/user_dashboard");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.listen(port, ()=>{
console.log(`Server started at ${port}`);
})

app.get("/", (req,res)=>{
    database.ping((err)=>{
        if (err) {
            return res.send("Server is down! ",err);
        } else{
            return res.send("Server is connected...");
        }
    })
})

const userRouter = require("./src/routes/user_routes");
app.use("/api/user", userRouter);