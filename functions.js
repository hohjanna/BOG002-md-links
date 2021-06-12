const fs = require('fs')
const markdownLinkExtractor = require('markdown-link-extractor');
const http = require('http');
const https = require('https');

//1 function: Read directory
//2 function: Read file - Done
//3 function: Extract links - Done
//4 function: Push objects(links) into array - Done
//5 function: Get protocol HTTP - Done
//6 function: Validate link status - Done
//7 function: Stats

const readFiles = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    });
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

const linkProtocol = (link) => {
    const url = new URL(link);
    let protocol = url.protocol;
    protocol === 'https:' ? (protocol = https) : (protocol = http) //Hacerlo mas simple
    return protocol
}

const checkLinkStatus = (object) => {
    const pathName = object.href
    const http = linkProtocol(pathName);
    const status = new Promise(resolve => {
        http.get(pathName, (res) => {
            const { statusCode } = res;
            if (statusCode !== 200 && statusCode !== 301) {
                resolve({...object, status: 'fail', status_code: statusCode })
            } else {
                resolve({...object, status: 'ok', status_code: statusCode })
            }
        });
    });
    return status
}

module.exports = {
    readFiles,
    extractLinks,
    objLink,
    newObjLink,
};