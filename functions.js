const fs = require('fs')
const markdownLinkExtractor = require('markdown-link-extractor');

//1 function: Read file
//2 function: Extract links
//3 function: Push objects(links) into array
//4 function: get protocol HTTP
//5 function: validate link status


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

const linkProtocol = (link) => {
    const url = new URL(link);
    const protocol = url.protocol;
    protocol === 'https:' ? (protocol = https) : (protocol = http)
    return protocol;
}


const checkLinkStatus = (object) => {
    const pathName = object.href
    const http = linkProtocol(pathName);
    const status = new Promise((resolve, reject) => {
        http.get(pathName, (res) => {
            const { statusNumber } = res;
            if (statusNumber !== 200 && statusNumber !== 301) {
                resolve({...object, status: fail, status_code: statusNumber })
            } else {
                resolve({...object, status: ok, status_code: statusNumber })
            }
        });
    });
    return status;
}


/*http.get(pathName, function(res) {
    console.log(res);

}).on('error', function(e) {
    console.log(e);

});;*/


module.exports = {
    readFiles,
    extractLinks,
    objLink,
    checkLinkStatus
};