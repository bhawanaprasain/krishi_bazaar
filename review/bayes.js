
const bayes =(sentence,data,removeStopwords,stemmer,addCount)=>{
    
    var wordList = removeStopwords(sentence)
    var stemmedList = stemmer(wordList)
    var data = addCount(stemmedList,data)
    positiveReviewScore = data.posCount/(data.posCount+data.negCount)
    negativeReviewScore =data.negCount/(data.posCount+data.negCount)

    var index

    positiveReviewScore = data.posCount/(data.posCount+data.negCount)
    negativeReviewScore =data.negCount/(data.posCount+data.negCount)
    for(index=0;index<stemmedList.length;index++){
        positiveReviewScore *= data.positiveDict[stemmedList[index]]/data.posCount
        negativeReviewScore *= data.negativeDict[stemmedList[index]]/data.negCount


    }
    console.log(positiveReviewScore,negativeReviewScore);
    
    if(positiveReviewScore>negativeReviewScore){
        console.log("Positive review");
    }
    else{
        console.log("negative review");
    }

}
module.exports = bayes