var natural = require("natural")

const stemmer =(wordlist)=>{
    stemmedList = []
    len = wordlist.length
    var index
    for(index=0; index<len; index++){
        stemmedList.push(natural.PorterStemmer.stem(wordlist[index]))
    }
    return stemmedList
}

module.exports = stemmer