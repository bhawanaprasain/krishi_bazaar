sw = require('stopword')
const removeStopwords =(sentence)=>{
    const oldString = sentence.split(' ')
    const newString = sw.removeStopwords(oldString)
    return newString
}

module.exports = removeStopwords