const mdLinks = require('../index');
const mocks = require('./mock');


describe('mdLinks', () => {
    test('should be a function', () => {
        expect(typeof mdLinks.mdLinks).toBe('function');
    });
    test('returns a promise', () => {
        const route = './dir';
        expect(mdLinks.mdLinks(route) instanceof Promise).toBeTruthy();
    });
    test('should throw an error if the file is not equal to the markdown file', () => {
        const route = 'oneFile.html';
        return mdLinks.mdLinks(route).catch(res => expect(res.message).toMatch('The route is not a Markdown file'));
    });
    test('should resolve an array that contents objects', () => {
        const route = 'oneFile.md';
        expect.assertions(1);
        return mdLinks.mdLinks(route, false).then(res => expect(res).toEqual(mocks.mdLinksArray));
    });
    test('should resolve an array that contents objects with validation', () => {
        const route = 'oneFile.md';
        expect.assertions(1);
        return mdLinks.mdLinks(route, true).then(res => expect(res).toEqual(mocks.mdLinksValidate));
    });
});