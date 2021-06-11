const { ReadStream } = require('fs');
const path = require('path');
const functions = require('./functions.js');




//Create a promise
/* TASKS:
1. Is it an absolute path? (resolve: convert to absolute , reject: err)
2. Is it a file.md? (resolve: validate file extension and then read the file , reject: err)
*/


const file = './README.md'

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
                Promise.all(functions.newObjLink(arr)).then(console.log)
            } else {
                console.log(array)
            }
        })
        .catch(error => error)

}
mdLinks(file, { validate: true })



// const arr = [{
//         file: 'readme.md',
//         href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
//         text: 'hooa mndo'
//     },
//     {
//         file: 'leeme.md',
//         href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
//         text: 'hooa mndo'
//     }
// ]

// Promise.all(functions.newObjLink(arr)).then(console.log)



// module.exports =  {
//     mdLinks
// };