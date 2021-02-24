function containsUser(receiverId, connectedCustomerList) {

    var i;
    for (i = 0; i < connectedCustomerList.length; i++) {
        if (connectedCustomerList[i] === receiverId) {
            return true;
        }
    }

    return false;
}
module.exports = containsUser