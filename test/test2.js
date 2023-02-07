let assert = require('chai').assert;
let expect = require('chai').expect;

let foo = 'bar';


describe('string', function () {
    it('asserts bar is string', function () {
        assert.typeOf(foo, 'string');
    });
});

describe('Expect', function () {
    it('expects bar is string', function () {
        expect(foo).to.be.an('string');
    });
});

describe('Sanity Test', () => {

    it('should run the test suite correctly', () => {

        expect(true).to.be.true;
    });
});