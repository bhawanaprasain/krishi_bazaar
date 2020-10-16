
const customers =async (data, Customer,containsUser)=>{
    //logged in user id
    console.log("WE ARE IN BACKEND");
    const u_id = data.id
    // id and name of person who creates post for buying or selling
    const offerId = data.eachoffer.id
    const offername= data.eachoffer.name
    roomId = String(u_id)+'{'+String(offerId)
    var  customers = await Customer.find({userId:u_id})
    console.log(customers);
        
    if(customers.length==1){
        var connectedCustomerList = customers[0].connectedCustomer
        index =containsUser(roomId,connectedCustomerList)
        if(index == false)
            {   
                console.log("NEW CONNECTION");
               await Customer.updateOne({userId:u_id},{$push:{connectedCustomer:{name:offername,roomId:roomId}}})
            }
        else{
            console.log("ALREADY CONNECTED");
        }
    }
    else {
        console.log("NEW ENTRY");
        var newCustomer = new Customer({
            userId:u_id,
            connectedCustomer:{name:offername,roomId:roomId}
        })
        await newCustomer.save()

    }
           
}
module.exports = customers