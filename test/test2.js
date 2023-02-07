let assert = require('chai').assert;

let foo = 'bar';


describe('string', function () {
    it('asserts bar is string', function () {
        assert.typeOf(foo, 'string');
    });
});
