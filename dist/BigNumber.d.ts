import { default as BigNum } from 'bignumber.js';
import { Config, IFormat } from './Config';
declare type TLong = string | number | BigNumber;
export declare class BigNumber {
    readonly bn: BigNum;
    static MIN_VALUE: BigNumber;
    static MAX_VALUE: BigNumber;
    static MIN_UNSIGNED_VALUE: BigNumber;
    static MAX_UNSIGNED_VALUE: BigNumber;
    static config: Config;
    constructor(long: TLong | BigNum | BigNumber);
    clone(): BigNumber;
    add(long: TLong): BigNumber;
    sub(long: TLong): BigNumber;
    mul(long: TLong): BigNumber;
    div(long: TLong): BigNumber;
    pow(exp: TLong): BigNumber;
    sqrt(): BigNumber;
    abs(): BigNumber;
    mod(divider: TLong): BigNumber;
    roundTo(decimals?: number, mode?: BigNumber.ROUND_MODE): BigNumber;
    eq(long: TLong): boolean;
    lt(long: TLong): boolean;
    gt(long: TLong): boolean;
    lte(long: TLong): boolean;
    gte(long: TLong): boolean;
    isNaN(): boolean;
    isFinite(): boolean;
    isZero(): boolean;
    isPositive(): boolean;
    isNegative(): boolean;
    isInt(): boolean;
    getDecimalsCount(): number;
    isEven(): boolean;
    isOdd(): boolean;
    isInSignedRange(): boolean;
    isInUnsignedRange(): boolean;
    toFormat(decimals?: number, roundMode?: BigNumber.ROUND_MODE, format?: IFormat): string;
    toFixed(decimals?: number, roundMode?: BigNumber.ROUND_MODE): string;
    toString(): string;
    toNumber(): number;
    toJSON(): string;
    valueOf(): string;
    toBytes({ isSigned, isLong }?: {
        isSigned?: boolean | undefined;
        isLong?: boolean | undefined;
    }): Uint8Array;
    static fromBytes(bytes: Uint8Array | Array<number>, { isSigned, isLong }?: {
        isSigned?: boolean | undefined;
        isLong?: boolean | undefined;
    }): BigNumber;
    static max(...items: Array<TLong>): BigNumber;
    static min(...items: Array<TLong>): BigNumber;
    static sum(...items: Array<TLong>): BigNumber;
    static isBigNumber(some: any): some is BigNumber;
    static toBigNumber(items: TLong): BigNumber;
    static toBigNumber(items: Array<TLong>): Array<BigNumber>;
    protected static toBigNumberJs(long: TLong | BigNum): BigNum;
    private static _toLength;
}
export declare namespace BigNumber {
    const enum ROUND_MODE {
        ROUND_UP = 0,
        ROUND_DOWN = 1,
        ROUND_CEIL = 2,
        ROUND_FLOOR = 3,
        ROUND_HALF_UP = 4,
        ROUND_HALF_DOWN = 5,
        ROUND_HALF_EVEN = 6,
        ROUND_HALF_CEIL = 7,
        ROUND_HALF_FLOOR = 8
    }
}
export {};
