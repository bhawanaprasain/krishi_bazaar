
const Chat= require("../models/Chat")
const Customer = require('../models/Customer')
const events = require("./events")
const containsUser = require("./checkuser")
const customers = require("./connectedCustomers");

function socket(io) {
    // this will handle all socket events
    events(io,Chat,Customer,containsUser,customers)
}

module.exports = socket
