
const  events=(io,Chat,Customer,containsUser,customers) =>{
    io.sockets.on("connection",socket=>{
        console.log("connected");
        socket.emit('test',function () {
            console.log('PING!')
        })

        socket.on("sendOffer", async ({senderId,receiverId})=>{
            // io.join(senderId+'{'+receiverId)

            // console.log(senderId,receiverId);
            customers(senderId,receiverId, Customer,containsUser)
        })
        socket.on("fetchmessages",async(data,callback)=>{
            var allMessages = await Chat.find({roomId:data.roomId})
            callback({data:allMessages})
        })

        socket.on("sendSingleMessage", async (data,callback)=>{
            var message = data.message
            var senderId = data.senderId
            var receiverId = data.receiverId
            var role = data.role
            if (role=="buyer"){
                var roomId = senderId +"{"+receiverId
            }
            else{
                var roomId = receiverId+"{"+senderId
            }
            // customers(senderId,receiverId, Customer,containsUser)

            console.log(roomId);
            var chatMessage = new Chat({
                senderId:senderId,
                receiverId:receiverId,
                roomId : roomId,
                message:message,
                role:role
            })
            await chatMessage.save()
            socket.broadcast.emit(roomId,{message,role})
            // console.log(await Chat.find({roomId:roomId}), "previous chats stored in database");

            callback({data:message})
        })

        socket.on("sendMessage", async ({senderId,receiverId,message})=>{
            roomId = senderId +"{"+receiverId
            var chatMessage = new Chat({
                senderId:senderId,
                receiverId:receiverId,
                roomId:roomId,
                message:message
            })

            await chatMessage.save()
            console.log(await Chat.find({senderId:senderId}), "all chat");

        })
    })
        
    }
    module.exports = events