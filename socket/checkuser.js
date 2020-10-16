function containsUser(obj, list) {

    var i;
    for (i = 0; i < list.length; i++) {
        if (String(list[i].roomId) === String(obj)) {
            return true;
        }
    }

    return false;
}
module.exports = containsUser