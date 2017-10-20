class Matrix{

    protected columnsCount:number;
    protected rowsCount:number;
    protected data:number[];

    // The idea behind this variable is that you can set it to false and get better performance.
    // Feature might be removed or expanded in future.
    static safe = true;

    constructor(matrixData:number[], rowCount:number=1 , columnCount?:number ){

        if (!matrixData){
            throw new Error("There is no spoon. (MatrixData is falsely)");
        }
        if(!columnCount){
            columnCount = matrixData.length;
        }
        if(columnCount <= 0 || rowCount <= 0){
            throw new Error("Invalid Length of a matrix");
        }
        if(rowCount*columnCount != matrixData.length ){
            throw new Error("Invalid Matrix Size");
        }

        this.columnsCount = columnCount;
        this.rowsCount = rowCount;

        if(Matrix.safe){
            this.data = Matrix.cloneData(matrixData);
        }else{
            this.data = matrixData;
        }

    }

    isSquare():boolean{
        return this.rowsCount == this.columnsCount;
    }

    isIdentity():boolean{
        if(!this.isSquare()){
            return false;
        }

        for (let i = 0; i<this.data.length;i++) {
            let value = (i%(this.rowsCount+1)==0) ? 1 : 0;
            if(this.data[i] != value){
                return false;
            }
        }

        return true;
    }

    transpose():Matrix{
        let data = Array(this.data.length);
        let index = 0;
        for (let i = 0; i < this.columnsCount; i++) {
            for (let j = 0; j < this.data.length; j+= this.columnsCount) {
                data[index] = this.data[i+j];
                index++;
            }
        }
        return new Matrix(data,this.columnsCount,this.rowsCount);

    }

    add(matrix:Matrix):Matrix{

        if(!this.isSameDimension(matrix)){
            throw new Error("Matrices need to be the same size to add.");
        }

        let newData = new Array(this.data.length);

        for(let i = 0 ; i<this.data.length;i++){
            newData[i] = this.data[i] + matrix.data[i];
        }

        return new Matrix(newData,this.rowsCount,this.columnsCount);

    }

    subtract(matrix:Matrix):Matrix{

        if(!this.isSameDimension(matrix)){
            throw new Error("Matrices need to be the same size to subtract.");
        }

        let newData = new Array(this.data.length);

        for(let i = 0 ; i<this.data.length;i++){
            newData[i] = this.data[i] - matrix.data[i];
        }
        return new Matrix(newData,this.rowsCount,this.columnsCount);
    }

    equal(matrix:Matrix):boolean{

        if(!this.isSameDimension(matrix)){
            return false;
        }

        for(let i = 0;i<this.data.length;i++){
            if(matrix.data[i] != this.data[i]){
                return false;
            }
        }
        return true;
    }

    scalarMultiply(num:number):Matrix{

        if (typeof num != "number"){
            throw new Error("Cannot Scalar multiply by a non number");
        }

        let newData = new Array(this.data.length);
        for (let i=0 ; i<this.data.length; i++){
            newData[i] = this.data[i]*num;
        }
        return new Matrix(newData,this.rowsCount,this.columnsCount);
    }

    multiply(matrix:Matrix):Matrix{
        if(this.columnsCount != matrix.rowsCount){
            throw new Error("Invalid Matrix Dimensions for a Multiplication");
        }

        let newMatrixData = new Array(this.rowsCount*matrix.columnsCount);
        let newMatrixIndex = 0 ;

        for(let i = 0; i < this.data.length; i = i + this.columnsCount) {

            for (let j = 0; j < matrix.columnsCount; j++) {
                let sum = 0;
                let x = i;
                let y = j;

                while (x < this.columnsCount+i) {
                    sum = sum + this.data[x] * matrix.data[y];
                    x = x + 1;
                    y = y + matrix.columnsCount;

                }
                newMatrixData[newMatrixIndex] = sum;

                newMatrixIndex++;
            }


        }

        return new Matrix(newMatrixData,this.rowsCount,matrix.columnsCount);

    }

    isSameDimension(matrix:Matrix):boolean{
        return (this.columnsCount == matrix.columnsCount && this.rowsCount == matrix.rowsCount);
    }

    getValue(row:number, column:number):number{
        return this.getValueA(row-1,column-1)
    }

    getValueA(row:number, column:number):number{
        if(row>=this.rowsCount || column>=this.columnsCount || row<0 || column<0){
            throw new Error('Matrix out of bound');
        }
        return this.data[(row)*(this.columnsCount)+column];
    }

    getData():number[]{
        return Matrix.safe ? Matrix.cloneData(this.data) : this.data;
    }

    toString():string{

        let rtnString = '\n[\n\t\t\ '+this.data[0];
        for (let i = 1; i < this.data.length; i++) {
           if(i%this.columnsCount==0){
                rtnString+= '\n\t';
           }
                rtnString+= '\t'+','+this.data[i];
        }
        return rtnString + '\n]\n';
    }

    private static cloneData(data:number[]){
        let newData = new Array(data.length);
        for (let i = 0; i < data.length; i++){
            newData[i] = data[i]
        }
        return newData;
    }

    static generateIdentityMatrix(size:number):Matrix{

        if(!size || size <= 0){
            throw new Error("Invalid Matrix Size");
        }

        let data = new Array(size*size);

        for (let i = 0; i<size*size;i++){
            data[i] = (i%(size+1)==0) ? 1 : 0;
        }

        return new Matrix(data,size,size);

    }

    public static isMatrix(obj){
        return !(!obj || !obj.columnsCount || !obj.rowsCount || !obj.rowsCount);
    }

    // Aliasing
    sub = this.subtract;
    T = this.transpose;
    t = this.transpose;
    eq = this.equal;
    sm = this.scalarMultiply;
    m = this.multiply;


}


// Export Module if only you are in a node like environment.
// This way this class can be used in vanilla JavaScript
try{
    // This is done so that TypeScript doesn't complain about module not existing.
    eval('module.exports = Matrix');
}catch (e){}
