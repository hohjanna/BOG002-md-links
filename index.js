const path = require('path');
const functions = require('./functions.js');


const mdLinks = (file, validate) => {
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
        .catch(error => console.log('The route is not a Markdown file', error));
}

module.exports = { mdLinks };