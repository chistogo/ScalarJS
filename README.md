# ScalarJS
Simple matrix module/class to do matrix operations

### Example
```javascript
var matrix1 = new Matrix([
    1,  2104,
    1,  1416,
    1,  1534,
    1,  852
],4,2);

var matrix2 = new Matrix([
    -40,    200,    -150,
    .25,    0.1,    0.4
],2,3);

matrix1.multiply(matrix2).transpose().toString();
```
#### Output
```text
[
		 486	,314	,343.5	,173
		,410.4	,341.6	,353.4	,285.2
		,691.6	,416.4	,463.6	,190.8
]
```


License
----

MIT
