var Matrix = (function () {
    function Matrix(matrixData, rowsLength, columnsLength) {
        if (rowsLength === void 0) { rowsLength = 1; }
        if (!matrixData) {
            throw new Error("There is no spoon. (MatrixData is falsely)");
        }
        if (!columnsLength) {
            columnsLength = matrixData.length;
        }
        if (columnsLength <= 0 || rowsLength <= 0) {
            throw new Error("Invalid Length of a matrix");
        }
        if (rowsLength * columnsLength != matrixData.length) {
            throw new Error("Invalid Matrix Size");
        }
        this.columnsLength = columnsLength;
        this.rowsLength = rowsLength;
        if (Matrix.safe) {
            this.data = Matrix.cloneData(matrixData);
        }
        else {
            this.data = matrixData;
        }
    }
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
    Matrix.prototype.isSquare = function () {
        return this.rowsLength == this.columnsLength;
    };
    Matrix.prototype.isIdentity = function () {
        if (!this.isSquare()) {
            return false;
        }
        for (var i = 0; i < this.data.length; i++) {
            var value = (i % (this.rowsLength + 1) == 0) ? 1 : 0;
            if (this.data[i] != value) {
                return false;
            }
        }
        return true;
    };
    Matrix.prototype.transpose = function () {
        var data = Array(this.data.length);
        var index = 0;
        for (var i = 0; i < this.columnsLength; i++) {
            for (var j = 0; j < this.data.length; j += this.columnsLength) {
                data[index] = this.data[i + j];
                index++;
            }
        }
        return new Matrix(data, this.columnsLength, this.rowsLength);
    };
    Matrix.prototype.add = function (matrix) {
        if (!this.isSameDimension(matrix)) {
            throw new Error("Matrices need to be the same size to add.");
        }
        var newData = new Array(this.data.length);
        for (var i = 0; i < this.data.length; i++) {
            newData[i] = this.data[i] + matrix.data[i];
        }
        return new Matrix(newData, this.rowsLength, this.columnsLength);
    };
    Matrix.prototype.subtract = function (matrix) {
        if (!this.isSameDimension(matrix)) {
            throw new Error("Matrices need to be the same size to subtract.");
        }
        var newData = new Array(this.data.length);
        for (var i = 0; i < this.data.length; i++) {
            newData[i] = this.data[i] - matrix.data[i];
        }
        return new Matrix(newData, this.rowsLength, this.columnsLength);
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
    Matrix.prototype.isSameDimension = function (matrix) {
        return (this.columnsLength == matrix.columnsLength && this.rowsLength == matrix.rowsLength);
    };
    ;
    Matrix.prototype.toString = function () {
        var rtnString = '[\n\t  ' + this.data[0];
        for (var i = 1; i < this.data.length; i++) {
            if (i % this.columnsLength == 0) {
                rtnString += '\n\t';
            }
            rtnString += ', ' + this.data[i];
        }
        return rtnString + '\n]';
    };
    Matrix.cloneData = function (data) {
        var newData = new Array(data.length);
        for (var i = 0; i < data.length; i++) {
            newData[i] = data[i];
        }
        return newData;
    };
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