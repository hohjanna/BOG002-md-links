//const path = require('path');
const functions = require('./functions.js');


const mdLinks = (file, validate) => {
        // const extFile = path.extname(file);
        // if (extFile !== '.md') {
        //     console.log('El archivo no se puede leer')
        // }
        return functions.readDirectory(file)
            .then(functions.extractLinks)
            .then(links => functions.objLink(links, file))
            .then(array => {
                if (validate === true) {
                    return Promise.all(functions.newObjLink(array))
                } else {
                    return array
                }
            })
            .catch(error => error)
    }
    // const p = './oneFile.md'
    // mdLinks(p, true)


module.exports = { mdLinks };