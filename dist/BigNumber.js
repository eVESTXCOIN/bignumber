"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var Config_1 = require("./Config");
var BigNumber = /** @class */ (function () {
    function BigNumber(long) {
        if (typeof long === 'object' && BigNumber.isBigNumber(long)) {
            this.bn = long.bn.plus(0);
        }
        else {
            this.bn = BigNumber.toBigNumberJs(long);
        }
    }
    BigNumber.prototype.clone = function () {
        return new BigNumber(this);
    };
    BigNumber.prototype.add = function (long) {
        return new BigNumber(this.bn.plus(BigNumber.toBigNumberJs(long)));
    };
    BigNumber.prototype.sub = function (long) {
        return new BigNumber(this.bn.minus(BigNumber.toBigNumberJs(long)));
    };
    BigNumber.prototype.mul = function (long) {
        return new BigNumber(this.bn.times(BigNumber.toBigNumberJs(long)));
    };
    BigNumber.prototype.div = function (long) {
        return new BigNumber(this.bn.div(BigNumber.toBigNumberJs(long)));
    };
    BigNumber.prototype.pow = function (exp) {
        return new BigNumber(this.bn.pow(BigNumber.toBigNumberJs(exp)));
    };
    BigNumber.prototype.sqrt = function () {
        return new BigNumber(this.bn.sqrt());
    };
    BigNumber.prototype.abs = function () {
        return new BigNumber(this.bn.abs());
    };
    BigNumber.prototype.mod = function (divider) {
        return new BigNumber(this.bn.mod(BigNumber.toBigNumberJs(divider)));
    };
    BigNumber.prototype.roundTo = function (decimals, mode) {
        if (decimals === void 0) { decimals = 0; }
        if (mode === void 0) { mode = 4 /* ROUND_HALF_UP */; }
        return new BigNumber(this.bn.dp(decimals || 0, mode));
    };
    BigNumber.prototype.eq = function (long) {
        return this.bn.eq(BigNumber.toBigNumberJs(long));
    };
    BigNumber.prototype.lt = function (long) {
        return this.bn.lt(BigNumber.toBigNumberJs(long));
    };
    BigNumber.prototype.gt = function (long) {
        return this.bn.gt(BigNumber.toBigNumberJs(long));
    };
    BigNumber.prototype.lte = function (long) {
        return this.bn.lte(BigNumber.toBigNumberJs(long));
    };
    BigNumber.prototype.gte = function (long) {
        return this.bn.gte(BigNumber.toBigNumberJs(long));
    };
    BigNumber.prototype.isNaN = function () {
        return this.bn.isNaN();
    };
    BigNumber.prototype.isFinite = function () {
        return this.bn.isFinite();
    };
    BigNumber.prototype.isZero = function () {
        return this.eq(0);
    };
    BigNumber.prototype.isPositive = function () {
        return this.gt(0);
    };
    BigNumber.prototype.isNegative = function () {
        return this.lt(0);
    };
    BigNumber.prototype.isInt = function () {
        return this.bn.isInteger();
    };
    BigNumber.prototype.getDecimalsCount = function () {
        return this.bn.dp();
    };
    BigNumber.prototype.isEven = function () {
        return this.mod(2).eq(0);
    };
    BigNumber.prototype.isOdd = function () {
        return !this.isEven();
    };
    BigNumber.prototype.isInSignedRange = function () {
        return (this.gte(BigNumber.MIN_VALUE) && this.lte(BigNumber.MAX_VALUE));
    };
    BigNumber.prototype.isInUnsignedRange = function () {
        return (this.gte(BigNumber.MIN_UNSIGNED_VALUE) && this.lte(BigNumber.MAX_UNSIGNED_VALUE));
    };
    BigNumber.prototype.toFormat = function (decimals, roundMode, format) {
        return this.bn.toFormat(decimals, roundMode, format);
    };
    BigNumber.prototype.toFixed = function (decimals, roundMode) {
        if (decimals == null) {
            return this.bn.toFixed();
        }
        else {
            return this.bn.toFixed(decimals, roundMode);
        }
    };
    BigNumber.prototype.toString = function () {
        return this.toFixed();
    };
    BigNumber.prototype.toNumber = function () {
        return this.bn.toNumber();
    };
    BigNumber.prototype.toJSON = function () {
        return this.bn.toFixed();
    };
    BigNumber.prototype.valueOf = function () {
        return this.bn.valueOf();
    };
    BigNumber.prototype.toBytes = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.isSigned, isSigned = _c === void 0 ? true : _c, _d = _b.isLong, isLong = _d === void 0 ? true : _d;
        if (!this.isInt()) {
            throw new Error('Cant create bytes from number with decimals!');
        }
        if (!isSigned && this.isNegative()) {
            throw new Error('Cant create bytes from negative number in signed mode!');
        }
        if (isLong && isSigned && !this.isInSignedRange()) {
            throw new Error('Number is not from signed numbers range');
        }
        if (isLong && !isSigned && !this.isInUnsignedRange()) {
            throw new Error('Number is not from unsigned numbers range');
        }
        var isNegative = isSigned && this.isNegative();
        var toAdd = isNegative ? '1' : '0';
        var byteString = this.bn.plus(toAdd).toString(2).replace('-', '');
        var stringLength = isLong
            ? 64
            : Math.ceil(byteString.length / 8) * 8;
        var baseStr = BigNumber._toLength(stringLength, byteString);
        var baseStrArr = baseStr.split('');
        var bytes = [];
        do {
            bytes.push(parseInt(baseStrArr.splice(0, 8).join(''), 2));
        } while (baseStrArr.length);
        return isNegative
            ? Uint8Array.from(bytes.map(function (byte) { return 255 - byte; }))
            : Uint8Array.from(bytes);
    };
    BigNumber.fromBytes = function (bytes, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.isSigned, isSigned = _c === void 0 ? true : _c, _d = _b.isLong, isLong = _d === void 0 ? true : _d;
        if (isLong && bytes.length !== 8) {
            throw new Error('Wrong bytes length! Minimal length is 8 byte!');
        }
        bytes = ((!isLong && bytes.length > 0) || isLong)
            ? bytes
            : [0];
        var isNegative = isSigned ? bytes[0] > 127 : false;
        var byteString = Array.from(bytes)
            .map(function (byte) { return isNegative ? 255 - byte : byte; })
            .map(function (byte) { return BigNumber._toLength(8, byte.toString(2)); })
            .join('');
        var result = new BigNumber(new bignumber_js_1.default(byteString, 2));
        return isNegative
            ? result.mul(-1).sub(1)
            : result;
    };
    BigNumber.max = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return BigNumber.toBigNumber(items)
            .reduce(function (max, item) { return max.gte(item) ? max : item; });
    };
    BigNumber.min = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return BigNumber.toBigNumber(items)
            .reduce(function (min, item) { return min.lte(item) ? min : item; });
    };
    BigNumber.sum = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return BigNumber.toBigNumber(items)
            .reduce(function (acc, item) { return acc.add(item); });
    };
    BigNumber.isBigNumber = function (some) {
        return some && typeof some === 'object' && (some instanceof BigNumber || Object.entries(BigNumber.prototype)
            .filter(function (_a) {
            var key = _a[0];
            return key.charAt(0) !== '_';
        })
            .every(function (_a) {
            var key = _a[0], value = _a[1];
            return (key in some) && typeof value === typeof some[key];
        }));
    };
    BigNumber.toBigNumber = function (items) {
        if (Array.isArray(items)) {
            return items.map(function (item) { return new BigNumber(item); });
        }
        else {
            return new BigNumber(items);
        }
    };
    BigNumber.toBigNumberJs = function (long) {
        if (bignumber_js_1.default.isBigNumber(long)) {
            return long;
        }
        else if (long instanceof BigNumber) {
            return long.bn;
        }
        else {
            return new bignumber_js_1.default(long);
        }
    };
    BigNumber._toLength = function (length, bytes) {
        return new Array(length)
            .fill('0', 0, length)
            .concat(bytes.split(''))
            .slice(-length)
            .join('');
    };
    BigNumber.MIN_VALUE = new BigNumber('-9223372036854775808');
    BigNumber.MAX_VALUE = new BigNumber('9223372036854775807');
    BigNumber.MIN_UNSIGNED_VALUE = new BigNumber('0');
    BigNumber.MAX_UNSIGNED_VALUE = new BigNumber('18446744073709551615');
    BigNumber.config = new Config_1.Config();
    return BigNumber;
}());
exports.BigNumber = BigNumber;
(function (BigNumber) {
    var ROUND_MODE;
    (function (ROUND_MODE) {
        ROUND_MODE[ROUND_MODE["ROUND_UP"] = 0] = "ROUND_UP";
        ROUND_MODE[ROUND_MODE["ROUND_DOWN"] = 1] = "ROUND_DOWN";
        ROUND_MODE[ROUND_MODE["ROUND_CEIL"] = 2] = "ROUND_CEIL";
        ROUND_MODE[ROUND_MODE["ROUND_FLOOR"] = 3] = "ROUND_FLOOR";
        ROUND_MODE[ROUND_MODE["ROUND_HALF_UP"] = 4] = "ROUND_HALF_UP";
        ROUND_MODE[ROUND_MODE["ROUND_HALF_DOWN"] = 5] = "ROUND_HALF_DOWN";
        ROUND_MODE[ROUND_MODE["ROUND_HALF_EVEN"] = 6] = "ROUND_HALF_EVEN";
        ROUND_MODE[ROUND_MODE["ROUND_HALF_CEIL"] = 7] = "ROUND_HALF_CEIL";
        ROUND_MODE[ROUND_MODE["ROUND_HALF_FLOOR"] = 8] = "ROUND_HALF_FLOOR";
    })(ROUND_MODE = BigNumber.ROUND_MODE || (BigNumber.ROUND_MODE = {}));
})(BigNumber = exports.BigNumber || (exports.BigNumber = {}));
exports.BigNumber = BigNumber;
//# sourceMappingURL=BigNumber.js.map