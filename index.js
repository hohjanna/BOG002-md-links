const path = require('path');
const functions = require('./functions.js');




//Create a promise
/* TASKS:
1. Is it an absolute path? (resolve: convert to absolute , reject: err)
2. Is it a file.md? (resolve: validate file extension and then read the file , reject: err)
*/


const file = './README.png'

const mdLinks = (file) => {
    const extFile = path.extname(file);
    if (extFile !== '.md') {
        console.log('El archivo no se puede leer')
    }
    functions.readFiles(file)
        .then(functions.extractLinks)
        .then(links => functions.objLink(links, file))
        .then(console.log)
        .catch(error => error)

}
mdLinks(file)

































//Function MD-LINKS

/*const mdLinks = (file, options = { validate: false }) => {

    const linksFile = new Promise((resolve, reject) => {
        const ext = path.extname(file);
        if (ext === '.md') {

            functions
                .readFiles(file)
                .then((data) => {
                    const getLinks = functions.extractLinks(data)
                    const arrLinks = functions.objLink(getLinks, onePath)
                    if (options.validate) {


                    } else {
                        resolve(arrLinks)
                    }


                })

            return linksFile;
        } else {
            console.log('El archivo no se puede leer')
        }
    })
}*/








// module.exports = () => {
//     mdLinks
// };