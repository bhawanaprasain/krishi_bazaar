
const wordCount = async (csv,frequencyCounter,removeStopwords,stemmer,bayes,testSentence,addCount,Review,reviewData)=>{
    var tokens =await csv().fromFile(process.env.FILE_PATH)
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
        bayes(testSentence,data,removeStopwords,stemmer,addCount,Review,reviewData)
});
}
module.exports = wordCount