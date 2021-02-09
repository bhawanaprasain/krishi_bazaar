
const  events=(io,Chat,Customer,containsUser,customers) =>{
    io.sockets.on("connection",socket=>{
        
        console.log("connected");
        socket.on("sendOffer", async ({data})=>{
            customers(data, Customer,containsUser)
        })

        socket.on("sendMessage", async ({data})=>{
            var chatMessage = new Chat({
                roomId:data.roomId,
                message:data.message
            })
            await chatMessage.save()
            var message = data.message
            console.log(message);
            socket.emit("eachMessage", {message})
        })

    
    })
        
    }
    module.exports = events