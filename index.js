const express =require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()
// connect to database
mongoose.connect(process.env.DB_CONNECT,
        {useNewUrlParser:true},
        ()=>{console.log("connected to database");})

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import routes
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const offerRoute = require("./routes/offers")

//Routes Middlewares
app.use('/user',authRoute)
app.use("/posts",postRoute)
app.use("/offers",offerRoute)

app.listen(3000, ()=>{
    console.log("Server is up");
})