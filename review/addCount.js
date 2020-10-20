
const addCount = (stemmedList,data)=>{
    var len = stemmedList.length
    Object.keys(data.positiveDict).forEach(function(key) {
        data.positiveDict[key] += 1
        data.posCount +=1
    });
    Object.keys(data.negativeDict).forEach(function(key) {
        data.negativeDict[key] += 1
        data.negCount +=1
    
    });
    for(var i=0;i<len;i++){
        
     
            if(data.positiveDict[stemmedList[i]] === undefined){
                data.positiveDict[stemmedList[i]]= 1
                data.posCount += 1
        

            }
            if(data.negativeDict[stemmedList[i]] === undefined){
                data.negativeDict[stemmedList[i]] = 1
                data.negCount += 1
                

            }
        
    }
    return data
}
module.exports = addCount