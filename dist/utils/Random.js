"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seedrandom_1 = require("seedrandom");
class default_1 {
    constructor(seed) {
        if (!!seed) {
            this.seed = seed;
        }
    }
    randomFunction() {
        if (!this.rndFnc) {
            this.rndFnc = this.seed ? new seedrandom_1.alea(this.seed).double : Math.random;
        }
        return this.rndFnc;
    }
    string(length) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(this.randomFunction()() * charactersLength));
        }
        return result;
    }
    max(max, inclusive) {
        return this.range(0, max, inclusive);
    }
    range(min, max, inclusive = true) {
        min = Math.ceil(min || 0);
        max = Math.floor(max);
        return Math.floor(this.randomFunction()() * (max - min + (inclusive ? 0 : 0)) + min);
    }
    double() {
        return this.randomFunction()();
    }
}
exports.default = default_1;
//# sourceMappingURL=Random.js.map