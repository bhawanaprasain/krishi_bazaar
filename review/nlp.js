const removeStopwords = require("./stopwords")
const stemmer = require("./stemming")
const frequencyCounter = require("./tokens")
const csv=require('csvtojson')
const wordCount = require("./wordCount")
const bayes = require("./bayes")
const addCount = require("./addCount")

testSentence = "How can one send eggs for egg plant? don't you have mind"

wordCount(csv, frequencyCounter,removeStopwords,stemmer,bayes,testSentence,addCount)
