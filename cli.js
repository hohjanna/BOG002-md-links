#! /usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const chalk = require('chalk');
const { mdLinks } = require("./index");
const [, , ...args] = process.argv;
const path = args[0];


if (!path) {
    console.error('Please enter a valid route')
} else {
    if (args.length == 1) {
        mdLinks(path).then(array => {
            array.forEach(object => {
                console.table({
                    File: object.file,
                    href: object.href,
                    text: object.text
                })
            })
        })
    }

    if (argv.validate && !argv.stats || argv.v && !argv.s) {
        mdLinks(path, true).then(array => {
            array.forEach(object => {
                console.table({
                    File: object.file,
                    href: object.href,
                    text: object.text,
                    statusOk: object.statusOk,
                    status: object.status
                })
            })
        })
    }

    if (argv.stats && !argv.validate || argv.s && !argv.v) {
        mdLinks(path)
            .then(links => {
                let urlArray = []
                links.forEach(link => {
                    urlArray.push(link.href)
                })
                let uniqs = new Set(urlArray);
                console.log(`|Links de: ${chalk.cyanBright(path)} |TOTAL  | ${chalk.yellowBright(links.length)} `);
                console.log(`|Links de: ${chalk.cyanBright(path)} |UNICOS | ${chalk.greenBright(uniqs.size)} `);
            })
    }

    if (argv.validate && argv.stats || argv.v && argv.s) {
        mdLinks(path, true)
            .then(links => {
                const total = links.length
                const uniqueLinks = new Set(links.map(link => link.href));
                const brokenLinks = links.filter(link => link.status !== 200);
                console.log(`|Links de: ${chalk.cyanBright(path)} |TOTAL  | ${chalk.yellowBright(total)} `);
                console.log(`|Links de: ${chalk.cyanBright(path)} |UNICOS | ${chalk.blueBright(uniqueLinks.size)} `);
                console.log(`|Links de: ${chalk.cyanBright(path)} |FAIL   | ${chalk.blueBright(brokenLinks.length)} `);
            })
    }
}

// if (help) {
//     console.log(chalk.bold.magentaBright(`
//     ------------------ H E L P ----------------------------------
//     |      Commands       |               Description            |
//     -------------------------------------------------------------
//     | --validate          |    Validate the link status          |
//     | --stats             |    Display total links               |
//     | --validate --stats  |    Display total and broken links    |
//     -------------------------------------------------------------
// `))
// }