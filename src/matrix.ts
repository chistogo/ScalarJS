class Matrix{

    protected columnsLength:number;
    protected rowsLength:number;
    protected data:number[];

    static safe = true;



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

    constructor(matrixData:number[], rowsLength:number=1 , columnsLength?:number ){

        if (!matrixData){
            throw new Error("There is no spoon. (MatrixData is falsely)");
        }
        if(!columnsLength){
            columnsLength = matrixData.length;
        }
        if(columnsLength <= 0 || rowsLength <= 0){
            throw new Error("Invalid Length of a matrix");
        }
        if(rowsLength*columnsLength != matrixData.length ){
            throw new Error("Invalid Matrix Size");
        }

        this.columnsLength = columnsLength;
        this.rowsLength = rowsLength;

        if(Matrix.safe){
            this.data = Matrix.cloneData(matrixData);
        }else{
            this.data = matrixData;
        }

    }

    isSquare():boolean{
        return this.rowsLength == this.columnsLength;
    }

    isIdentity():boolean{
        if(!this.isSquare()){
            return false;
        }

        for (let i = 0; i<this.data.length;i++) {
            let value = (i%(this.rowsLength+1)==0) ? 1 : 0;
            if(this.data[i] != value){
                return false;
            }
        }

        return true;
    }

    transpose():Matrix{
        let data = Array(this.data.length);
        let index = 0;
        for (let i = 0; i < this.columnsLength; i++) {
            for (let j = 0; j < this.data.length; j+= this.columnsLength) {
                data[index] = this.data[i+j];
                index++;
            }
        }
        return new Matrix(data,this.columnsLength,this.rowsLength);

    }

    add(matrix:Matrix):Matrix{
        if(!this.isSameDimension(matrix)){
            throw new Error("Matrices need to be the same size to add.");
        }

        let newData = new Array(this.data.length);

        for(let i = 0 ; i<this.data.length;i++){
            newData[i] = this.data[i] + matrix.data[i];
        }

        return new Matrix(newData,this.rowsLength,this.columnsLength);

    }

    subtract(matrix:Matrix):Matrix{

        if(!this.isSameDimension(matrix)){
            throw new Error("Matrices need to be the same size to subtract.");
        }

        let newData = new Array(this.data.length);

        for(let i = 0 ; i<this.data.length;i++){
            newData[i] = this.data[i] - matrix.data[i];
        }
        return new Matrix(newData,this.rowsLength,this.columnsLength);
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

    isSameDimension(matrix:Matrix):boolean{
        return (this.columnsLength == matrix.columnsLength && this.rowsLength == matrix.rowsLength);
    };

    toString():string{

        let rtnString = '[\n\t  '+this.data[0];
        for (let i = 1; i < this.data.length; i++) {
           if(i%this.columnsLength==0){
                rtnString+= '\n\t';
           }
                rtnString+= ', '+this.data[i];
        }
        return rtnString + '\n]';
    }


    private static cloneData(data:number[]){
        let newData = new Array(data.length);
        for (let i = 0; i < data.length; i++){
            newData[i] = data[i]
        }
        return newData;
    }

}


// Export Module if only you are in a node like environment.
// This way this class can be used in vanilla JavaScript
try{
    // This is done so that TypeScript doesn't complain about module not existing.
    eval('module.exports = Matrix');
}catch (e){}
