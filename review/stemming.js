var natural = require("natural")

const stemmer =(wordlist)=>{
    stemmedList = []
    len = wordlist.length
    var index
    commonNouns =["apple","apples","mango","mangoes","goods","buyer", "seller","vegetables", "vegetable", "fruit","fruits","tomatoes","tomato", "veggies"]
    for(index=0; index<len; index++){
        
        if(!commonNouns.includes(wordlist[index])){
            stemmedList.push(natural.PorterStemmer.stem(wordlist[index]))

        }

    }
    return stemmedList
}

module.exports = stemmer