
const customers =async (senderId,receiverId, Customer,containsUser)=>{
    //logged in user id
    console.log("WE ARE IN BACKEND");

 
    // id and name of person who creates post for buying or selling
    // const offerId = data.eachoffer.id
    // const offername= data.eachoffer.name
    roomId = senderId+'{'+receiverId
    var  customers = await Customer.findOne({userId:senderId})
    console.log(customers,"check");
        
    if(customers){
        var connectedCustomerList = customers.connectedCustomerId
        console.log(connectedCustomerList,"list");
        index =containsUser(receiverId,connectedCustomerList)
        if(index == false)
            {   
                console.log("NEW CONNECTION");
               await Customer.updateOne({userId:senderId},{$push:{connectedCustomerId:receiverId}})
            }
        else{
            console.log("ALREADY CONNECTED");
        }
    }
    else {
        console.log("NEW ENTRY");
        console.log(senderId,receiverId);
        var newCustomer = new Customer({
            userId:senderId,
            connectedCustomerId:receiverId,
            connectedRoomId: roomId
        })
        console.log(newCustomer);
        await newCustomer.save()
    }
           
}
module.exports = customers