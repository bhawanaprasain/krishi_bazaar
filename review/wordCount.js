const wordCount = async (csv,frequencyCounter,removeStopwords,stemmer,analyzer,testSentence)=>{
    var tokens =await csv().fromFile("./review.csv")
    .then((json)=>{
        var positiveDict ={}
        var negativeDict ={}
        var posCount=0
        var negCount=0
        var data ={positiveDict,negativeDict,posCount,negCount}
        json.forEach(row=>{
            const wordList = removeStopwords(row.Review)
            const stemmedList = stemmer(wordList)
             data = frequencyCounter(stemmedList,row.label,data)  
        })
        analyzer(testSentence,data,removeStopwords,stemmer)
});
}
module.exports = wordCount