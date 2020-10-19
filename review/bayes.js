
const analyzer =(sentence,data,removeStopwords,stemmer)=>{
    
    var wordList = removeStopwords(sentence)
    var stemmedList = stemmer(wordList)
    var len = stemmedList.length
    var index
    var posValue = 0
    var negValue = 0
    for(index=0;index<len;index++){
        if(data.positiveDict[stemmedList[index]] != undefined){
            posValue += data.positiveDict[stemmedList[index]]
        }
        if(data.negativeDict[stemmedList[index]] != undefined){
            negValue += data.negativeDict[stemmedList[index]]
        }

    }
    positiveReviewScore = posValue/data.posCount
    negativeReviewScore =negValue/data.negCount
    if(positiveReviewScore>negativeReviewScore){
        console.log("Positive review");
    }
    else{
        console.log("negative review");
    }

}
module.exports = analyzer