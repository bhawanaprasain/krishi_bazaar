sw = require('stopword')
const removeStopwords =(sentence)=>{
    // console.log(sentence,"checkpoint");
    const oldString = sentence.split(' ')
    const newString = sw.removeStopwords(oldString)
    return newString
}

module.exports = removeStopwords