// import { drawApp } from "../src/drawApp.js";
const { drawApp } = require("../src/drawApp");

describe("drawApp", () => {
    let el;

    beforeEach(() => {
        el = document.createElement('div');
        drawApp(el);
    });

    it('is a function', function () {
        expect(drawApp).to.be.instanceof(Function);
    });
})