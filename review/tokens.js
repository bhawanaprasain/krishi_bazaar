//label=1 =>positive
//label=0 =>negative
const frequencyCounter=(wordList,label,data)=>{
    var len = wordList.length
    var index
    for(index=0; index<len; index++){
        if(label==1){
            data.posCount += 1
            if(data.positiveDict[wordList[index]] == undefined){
                data.positiveDict[wordList[index]] = 1
            }
            else{
                data.positiveDict[wordList[index]] += 1
            }
        }
            else{
            data.negCount += 1
            if(data.negativeDict[wordList[index]] == undefined){
                data.negativeDict[wordList[index]] = 1
            }
            else{
                data.negativeDict[wordList[index]] += 1
            }
        }
    }
 
return data
}


module.exports = frequencyCounter