const bayes =async (sentence,data,removeStopwords,stemmer,addCount,Review,reviewData,User)=>{
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
    var user = await Review.findOne({userId: reviewData.sellerId})
    if(positiveReviewScore>negativeReviewScore){
        console.log("Positive review");
        if(user){
            await Review.updateOne({userId:reviewData.sellerId},
                {$push:{review:[{description:reviewData.review,rating:reviewData.rating,customerId:reviewData.customerId}]},
                $inc:{positiveReview: 1}})
            console.log(await Review.findOne({userId:reviewData.sellerId}));
        }
        else{
            var user = await User.findOne({_id: reviewData.sellerId})
            console.log(reviewData);
            var description = reviewData.review
            var rating =reviewData.rating
            var customerId = reviewData.customerId
            var name = reviewData.name
            var data = new Review({
                userId:reviewData.sellerId,
                role:reviewData.role,
                name:user.fname + user.lname,
                address:user.city + "," + user.district,
                review:[{description:description, rating: rating,customerId:customerId,name:name}],
                positiveReview:1,
                negativeReview:0
            })
           await data.save()
           console.log(await Review.findOne({userId:reviewData.sellerId}));

        }
    }
    else{
        console.log("negative review");
        if(user){
            await Review.updateOne({userId:reviewData.sellerId},
                {$push:{review:[{description:reviewData.review,rating:reviewData.rating,customerId:reviewData.customerId}]},
                 $inc:{negativeReview: 1}})
                // console.log(await Review.findOne({userId:reviewData.sellerId}));
        }
        else{

            var user = await User.findOne({_id: reviewData.sellerId})
            var data = new Review({
                userId:reviewData.sellerId,
                role:reviewData.role,
                name:user.fname + user.lname,
                address:user.city + "," + user.district,
                review:[{description:reviewData.review,rating: reviewData.rating,customerId:reviewData.customerId}],
                positiveReview:0,
                negativeReview:1
            })
           await data.save()
        }
    }
}
module.exports = bayes