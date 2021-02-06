const bayes =async (sentence,data,removeStopwords,stemmer,addCount,Review,reviewData)=>{
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
    var user = await Review.findOne({userId: reviewData.id})
    if(positiveReviewScore>negativeReviewScore){
        console.log("Positive review");
        if(user){
            await Review.updateOne({userId:reviewData.id},
                {$push:{review:[{description:reviewData.review,rating:reviewData.rating,customerId:reviewData.customerId}]},
                $inc:{positiveReview: 1}})
            console.log(await Review.findOne({userId:reviewData.id}));
        }
        else{
            var data = new Review({
                userId:reviewData.id,
                role:reviewData.role,
                review:[{description:reviewData.review, rating: reviewData.rating,customerId:reviewData.customerId}],
                positiveReview:1,
                negativeReview:0
            })
           await data.save()
           console.log(await Review.findOne({userId:reviewData.id}));

        }
    }
    else{
        console.log("negative review");
        if(user){
            await Review.updateOne({userId:reviewData.id},
                {$push:{review:[{description:reviewData.review,rating:reviewData.rating,customerId:reviewData.customerId}]},
                 $inc:{negativeReview: 1}})
            console.log(await Review.findOne({userId:reviewData.id}));
        }
        else{
            var data = new Review({
                userId:reviewData.id,
                role:reviewData.role,
                review:[{description:reviewData.review,rating: reviewData.rating,customerId:reviewData.customerId}],
                positiveReview:0,
                negativeReview:1
            })
           await data.save()
           console.log(await Review.findOne({userId:reviewData.id}));
        }
    }
}
module.exports = bayes