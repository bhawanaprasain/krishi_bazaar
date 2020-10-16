
const  events=(io,Chat,Customer,containsUser,customers) =>{
    io.sockets.on("connection",socket=>{
        

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
            socket.emit("eachMessage", {message})
        })

    
    })
        
    }
    module.exports = events