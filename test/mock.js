const mdLinksArray = [{
        file: 'oneFile.md',
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2',
        text: 'Linea de comando CLI'
    },
    {
        file: 'oneFile.md',
        href: 'https://github.com/workshopper/how-to-npm',
        text: 'how-to-npm'
    },
];

const mdLinksValidate = [{
        file: 'oneFile.md',
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2',
        text: 'Linea de comando CLI',
        statusOk: 'fail',
        status: 404
    },
    {
        file: 'oneFile.md',
        href: 'https://github.com/workshopper/how-to-npm',
        text: 'how-to-npm',
        statusOk: 'ok',
        status: 200

    },
]

module.exports = {
    mdLinksArray,
    mdLinksValidate
};