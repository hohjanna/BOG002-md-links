const path = require('path');
const functions = require('./functions.js');




//Create a promise
/* TASKS:
1. Is it an absolute path? (resolve: convert to absolute , reject: err)
2. Is it a file.md? (resolve: validate file extension and then read the file , reject: err)
*/


const file = './file.md'

const mdLinks = (file, validate) => {
    const extFile = path.extname(file);
    if (extFile !== '.md') {
        console.log('El archivo no se puede leer')
    }
    return functions.readFiles(file)
        .then(functions.extractLinks)
        .then(links => functions.objLink(links, file))
        .then(array => {
            if (validate === true) {
                Promise.all(functions.newObjLink(array)).then(console.log)
            } else {
                console.log(arrPromises)
            }
        })
        .catch(error => error)

}
mdLinks(file, true)





// module.exports =  {
//     mdLinks
// };