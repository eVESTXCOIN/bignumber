# @evestx/bignumber

A JavaScript library for arbitrary-precision decimal and non-decimal arithmetic.

<br />

## Load

The library is the single JavaScript file *bignumber.umd.js* (or minified, *bignumber.umd.min.js*).

Browser:

```html
<script src='./dist/bignumber.umd.min.js'></script>
```

[Node.js](http://nodejs.org):

```bash
$ npm install @evestx/bignumber
```

```javascript
const { BigNumber } = require('@evestx/bignumber');
```

ES6 module:

```javascript
import { BigNumber } from "@evestx/bignumber"
```

AMD loader libraries such as [requireJS](http://requirejs.org/):

```javascript
require(['@evestx/bignumber'], function(BigNumber) {
    // Use BigNumber here in local scope. No global BigNumber.
});
```

## Use

```javascript
let x = new BigNumber(123.4567);
let y = BigNumber('123456.7e-3');
let z = new BigNumber(x);
x.eq(y) && y.eq(z) && x.eq(z);      // true
```

To get the string value of a BigNumber use [`toString()`](http://mikemcl.github.io/bignumber.js/#toS) or [`toFixed()`](http://mikemcl.github.io/bignumber.js/#toFix). Using `toFixed()` prevents exponential notation being returned, no matter how large or small the value.

```javascript
let x = new BigNumber('1111222233334444555566');
x.toString();                       // "1111222233334444555566"
x.toFixed();                        // "1111222233334444555566"
```

##### Clone
Clones an object

```javascript
const some = new BigNumber(1);
const clone = some.clone();
```

##### Add
Performs addition
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.add('50'); // with method toFixed '150'
```

##### Sub
Subtraction
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.sub('50'); // with method toFixed '50'
```

##### Mul
Multiplication
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.mul(2); // with method toFixed '200'
```

##### Div
Division
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.div(2); //  with method toFixed '50'
```

##### Pow
Exponentiation
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.pow(2); // with method toFixed '10000'
```

##### Sqrt
Square root
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.sqrt(); // with method toFixed '10'
```


##### Abs
Module

```javascript
const bigNum = new BigNumber('-100');
const result = bigNum.abs(); // with method toFixed 100
```

##### Mod 
Remainder of the division

```javascript
const bigNum = new BigNumber('100');
const result = bigNum.mod(10); // with method toFixed '0' 
```

##### RoundTo
Rounds up. Accepts number of decimal places after rounding and rounding mode
see here: http://mikemcl.github.io/bignumber.js/#constructor-properties
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.roundTo(); //
```

##### Eq
Equality
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.eq(100); // true
```

##### Lt
Less
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.lt(); //
```

##### Gt
More
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.gt(); //
```

##### Lte
Less than or equal to
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.lte(); //
```

##### Gte
More or equal
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.gte(); //
```

##### IsNaN
Checks for NaN
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isNaN(); // false
```

##### IsFinite
Checks for Infinity (positive and negative)
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isFinite(); //
```

##### IsZero
Checks for null
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isZero(); // false
```

##### IsPositive
Above zero
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isPositive(); // true
```

##### IsNegative
Less than zero
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isNegative(); // false
```

##### IsInt
Checks if an integer
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isInt(); //
```

##### GetDecimalsCount
We get the number of zanks after the decimal point of the number
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.getDecimalsCount(); // 0
```

##### IsEven
Even
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isEven(); // true
```

##### IsOdd
not even
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isOdd(); // false
```

##### ToBytes
Convert the number to signed bytes (8 bytes). Works only with integers.
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.toBytes();
```

##### ToFormat
We output the number in the string equivalent of c, taking into account the formatting settings.
Optionally accepts the number of rounding characters, rounding mode (as in roundTo), and output format settings.
```javascript
const bigNum = new BigNumber('1000000.12312');
bigNum.toFormat(); // 1,000,000.12312 
bigNum.toFormat(2); // 1,000,000.12 
bigNum.toFormat(2); // 1,000,000.12 
bigNum.toFormat(2, 0); // 1,000,000.13 
bigNum.toFormat(2, 0, { groupSeparator: ' ' }); // 1 000 000.13 
```

##### ToFixed
Output the number in string equivalent. Optionally accepts the number of rounding characters and the rounding mode (as in roundTo)
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.toFixed(); //
```

##### ToNumber
Leads to number
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.toNumber(); //
```

### Static Methods

##### fromBytes
Outputs a signed number from bytes. Only works with 8 bytes.
```javascript
const some = BigNumber.fromBytes(Uint8Array.from([1,2,3,4,5,6,7,8]));
```

##### max
Takes any number of arguments, chooses the largest number from the arguments
```javascript
BigNumber.max(1, '2', new BigNumber(4)); // with method toFixed '4'
```
##### min
Takes any number of arguments, chooses the smallest number of arguments
```javascript
BigNumber.min(1, '2', new BigNumber(4)); // with method toFixed '1'
```
##### sum
Takes any number of arguments, adds numbers
```javascript
BigNumber.min(1, '2', new BigNumber(4)); //with method toFixed '7'
```