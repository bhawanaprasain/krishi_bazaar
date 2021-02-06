const removeStopwords = require("./stopwords")
const stemmer = require("./stemming")
const frequencyCounter = require("./tokens")
const csv=require('csvtojson')
const wordCount = require("./wordCount")
const bayes = require("./bayes")
const addCount = require("./addCount")

module.exports = {removeStopwords,stemmer,frequencyCounter,csv,bayes,wordCount,addCount}