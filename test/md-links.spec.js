//const mdLinks = require('../');
const functions = require('../functions');


describe('readDirectory', () => {
    test('should be a function', () => {
        expect(typeof functions.readDirectory).toBe('function');
    });
    test('should return a promise with any route', () => {
        const route = './dir'
        expect(typeof functions.readDirectory(route)).toBe('object');

    });
});