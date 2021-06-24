const fs = require('fs')
const markdownLinkExtractor = require('markdown-link-extractor');
const axios = require('axios');
const dir = require('node-dir');
const path = require('path');


const isDirectory = route => fs.statSync(route).isDirectory();
const isFile = route => fs.statSync(route).isFile();

const readDirectory = route => new Promise(resolve => {
    if (isDirectory(route)) {
        dir.promiseFiles(route)
            .then(files => files.filter(i => path.extname(i) === '.md'))
            .then(mdFiles => {
                const mdFilesArr = mdFiles.map(file => fs.readFileSync(file, 'utf8'))
                resolve(mdFilesArr.join(' '))
            })
    } else if (isFile(route)) {
        if (path.extname(route) === '.md') {
            const data = fs.readFileSync(route, 'utf8');
            resolve(data);
        }
    }
})


const extractLinks = (data) => markdownLinkExtractor(data, true);

const objLink = (links, path) => {
    const arrLinks = [];
    links.forEach((link) => {
        const foundLink = link.href
        const foundText = link.text;
        const objLink = {
            file: path,
            href: foundLink,
            text: foundText,
        }
        arrLinks.push(objLink)
    })
    return arrLinks
}

const newObjLink = (array) => {
    const arrayPromise = array.map(obj => checkLinkStatus(obj))
    return arrayPromise
}

const checkLinkStatus = object => {
    const pathName = object.href;
    const status = new Promise(resolve => {
        axios.get(pathName)
            .then(response => {
                resolve({...object, statusOk: 'ok', status: response.status })
            })
            .catch(error => {
                resolve({...object, statusOk: 'fail', status: error.response.status })
            })
    });
    return status
}

module.exports = {
    readDirectory,
    extractLinks,
    objLink,
    newObjLink,
};