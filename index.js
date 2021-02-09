const express =require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)
const cors = require("cors")

dotenv.config()
// connect to database
mongoose.connect(process.env.DB_CONNECT,
        {useNewUrlParser:true},
        ()=>{console.log("connected to database");})

//Middleware


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
//import routes
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const offerRoute = require("./routes/offers")
const chatRoute = require("./routes/chat")
const reviewRoute = require("./routes/review")
const rankingRoute = require("./routes/ranking")
const profileRoute = require("./routes/profile")





//socket
const socket = require('./socket/socket')
socket(io)


app.use('/user',authRoute)
app.use("/posts",postRoute)
app.use("/offers",offerRoute)
app.use("/chat", chatRoute)
app.use("/", reviewRoute)
app.use("/", rankingRoute)
app.use("/", profileRoute)


server.listen(4000, ()=>{
    console.log("Server is up");
})

module.exports = app