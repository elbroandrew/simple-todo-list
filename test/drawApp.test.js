import {drawApp} from "../src/drawApp.js";
import { JSDOM } from "jsdom";
import { expect } from "chai";

describe("drawApp", () => {
    let el;
    const document = (new JSDOM(`...`)).window.document;

    beforeEach(() => {
        el = document.createElement('div');
        drawApp(el);
    });

    it('is a function', function () {
        expect(drawApp).to.be.instanceof(Function);
    });

    it("draws basic markup", () => {
        expect(el.querySelector("h1")).to.be.ok;
        expect(el.querySelector("button")).to.be.ok;
    });
})