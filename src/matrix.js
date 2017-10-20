var Matrix = /** @class */ (function () {
    function Matrix(matrixData, rowCount, columnCount) {
        if (rowCount === void 0) { rowCount = 1; }
        // Aliasing
        this.sub = this.subtract;
        this.T = this.transpose;
        this.t = this.transpose;
        this.eq = this.equal;
        this.sm = this.scalarMultiply;
        this.m = this.multiply;
        if (!matrixData) {
            throw new Error("There is no spoon. (MatrixData is falsely)");
        }
        if (!columnCount) {
            columnCount = matrixData.length;
        }
        if (columnCount <= 0 || rowCount <= 0) {
            throw new Error("Invalid Length of a matrix");
        }
        if (rowCount * columnCount != matrixData.length) {
            throw new Error("Invalid Matrix Size");
        }
        this.columnsCount = columnCount;
        this.rowsCount = rowCount;
        if (Matrix.safe) {
            this.data = Matrix.cloneData(matrixData);
        }
        else {
            this.data = matrixData;
        }
    }
    Matrix.prototype.isSquare = function () {
        return this.rowsCount == this.columnsCount;
    };
    Matrix.prototype.isIdentity = function () {
        if (!this.isSquare()) {
            return false;
        }
        for (var i = 0; i < this.data.length; i++) {
            var value = (i % (this.rowsCount + 1) == 0) ? 1 : 0;
            if (this.data[i] != value) {
                return false;
            }
        }
        return true;
    };
    Matrix.prototype.transpose = function () {
        var data = Array(this.data.length);
        var index = 0;
        for (var i = 0; i < this.columnsCount; i++) {
            for (var j = 0; j < this.data.length; j += this.columnsCount) {
                data[index] = this.data[i + j];
                index++;
            }
        }
        return new Matrix(data, this.columnsCount, this.rowsCount);
    };
    Matrix.prototype.add = function (matrix) {
        if (!this.isSameDimension(matrix)) {
            throw new Error("Matrices need to be the same size to add.");
        }
        var newData = new Array(this.data.length);
        for (var i = 0; i < this.data.length; i++) {
            newData[i] = this.data[i] + matrix.data[i];
        }
        return new Matrix(newData, this.rowsCount, this.columnsCount);
    };
    Matrix.prototype.subtract = function (matrix) {
        if (!this.isSameDimension(matrix)) {
            throw new Error("Matrices need to be the same size to subtract.");
        }
        var newData = new Array(this.data.length);
        for (var i = 0; i < this.data.length; i++) {
            newData[i] = this.data[i] - matrix.data[i];
        }
        return new Matrix(newData, this.rowsCount, this.columnsCount);
    };
    Matrix.prototype.equal = function (matrix) {
        if (!this.isSameDimension(matrix)) {
            return false;
        }
        for (var i = 0; i < this.data.length; i++) {
            if (matrix.data[i] != this.data[i]) {
                return false;
            }
        }
        return true;
    };
    Matrix.prototype.scalarMultiply = function (num) {
        if (typeof num != "number") {
            throw new Error("Cannot Scalar multiply by a non number");
        }
        var newData = new Array(this.data.length);
        for (var i = 0; i < this.data.length; i++) {
            newData[i] = this.data[i] * num;
        }
        return new Matrix(newData, this.rowsCount, this.columnsCount);
    };
    Matrix.prototype.multiply = function (matrix) {
        if (this.columnsCount != matrix.rowsCount) {
            throw new Error("Invalid Matrix Dimensions for a Multiplication");
        }
        var newMatrixData = new Array(this.rowsCount * matrix.columnsCount);
        var newMatrixIndex = 0;
        for (var i = 0; i < this.data.length; i = i + this.columnsCount) {
            for (var j = 0; j < matrix.columnsCount; j++) {
                var sum = 0;
                var x = i;
                var y = j;
                while (x < this.columnsCount + i) {
                    sum = sum + this.data[x] * matrix.data[y];
                    x = x + 1;
                    y = y + matrix.columnsCount;
                }
                newMatrixData[newMatrixIndex] = sum;
                newMatrixIndex++;
            }
        }
        return new Matrix(newMatrixData, this.rowsCount, matrix.columnsCount);
    };
    Matrix.prototype.isSameDimension = function (matrix) {
        return (this.columnsCount == matrix.columnsCount && this.rowsCount == matrix.rowsCount);
    };
    Matrix.prototype.getValue = function (row, column) {
        return this.getValueA(row - 1, column - 1);
    };
    Matrix.prototype.getValueA = function (row, column) {
        if (row >= this.rowsCount || column >= this.columnsCount || row < 0 || column < 0) {
            throw new Error('Matrix out of bound');
        }
        return this.data[(row) * (this.columnsCount) + column];
    };
    Matrix.prototype.getData = function () {
        return Matrix.safe ? Matrix.cloneData(this.data) : this.data;
    };
    Matrix.prototype.toString = function () {
        var rtnString = '\n[\n\t\t\ ' + this.data[0];
        for (var i = 1; i < this.data.length; i++) {
            if (i % this.columnsCount == 0) {
                rtnString += '\n\t';
            }
            rtnString += '\t' + ',' + this.data[i];
        }
        return rtnString + '\n]\n';
    };
    Matrix.cloneData = function (data) {
        var newData = new Array(data.length);
        for (var i = 0; i < data.length; i++) {
            newData[i] = data[i];
        }
        return newData;
    };
    Matrix.generateIdentityMatrix = function (size) {
        if (!size || size <= 0) {
            throw new Error("Invalid Matrix Size");
        }
        var data = new Array(size * size);
        for (var i = 0; i < size * size; i++) {
            data[i] = (i % (size + 1) == 0) ? 1 : 0;
        }
        return new Matrix(data, size, size);
    };
    Matrix.isMatrix = function (obj) {
        return !(!obj || !obj.columnsCount || !obj.rowsCount || !obj.rowsCount);
    };
    // The idea behind this variable is that you can set it to false and get better performance.
    // Feature might be removed or expanded in future.
    Matrix.safe = true;
    return Matrix;
}());
// Export Module if only you are in a node like environment.
// This way this class can be used in vanilla JavaScript
try {
    // This is done so that TypeScript doesn't complain about module not existing.
    eval('module.exports = Matrix');
}
catch (e) { }
//# sourceMappingURL=matrix.js.map