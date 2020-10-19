const removeStopwords = require("./stopwords")
const stemmer = require("./stemming")
const frequencyCounter = require("./tokens")
const csv=require('csvtojson')
const wordCount = require("./wordCount")
const analyzer = require("./bayes")

testSentence = "I am not visiting this place from now on always"

wordCount(csv, frequencyCounter,removeStopwords,stemmer,analyzer,testSentence)
