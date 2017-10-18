var assert = require('assert');
var Matrix = require('./../src/matrix');
var expect = require('chai').expect;

describe('Matrix', function() {



    var vec2;
    var vec3;
    var vec4;
    var matrix3x1;
    var matrix2x2;
    var matrix2x3;
    var matrix3x2;
    var matrix4x4;

    beforeEach(function() {

        Matrix.safe = true;

        vec2 = new Matrix([2,4]);
        vec3 = new Matrix([22,23,32]);
        vec4 = new Matrix([124,1,32,5]);

        matrix3x1 = new Matrix(
            [
                3,
                2,
                1
            ],3,1);

        matrix2x2 = new Matrix(
            [
                4,  1,
                2,  3
            ],2,2);

        matrix2x3 = new Matrix(
            [
                2,  6,  3,
                5,  14, 41
            ],2,3
        );

        matrix3x2 = new Matrix(
            [
                2,  6,
                3,  5,
                14, 41
            ],3,2
        );

        matrix4x4 = new Matrix(
            [
                1,  2,  3,  4,
                5,  6,  7,  8,
                9,  10, 11, 12,
                13, 14, 15, 16
            ],4,4
        );

    });

    describe('#contructor()', function() {
        it('should fail with null data',function () {
            assert.throws(function () {
                new Matrix();
            },Error,"Error Thrown")
        });

        it('should fail with invalid size',function () {
            assert.throws(function () {
                new Matrix([1,2,3],2,2);
            },Error,"Error Thrown")
        });

        it('should fail on negative column value',function () {
            assert.throws(function () {
                new Matrix([1,2,3],-3);
            },Error,"Error Thrown")
        });

        it('should be able to create vector with no second and third parameter',function () {

            var newMatrix = new Matrix([1,2,3]);
            expect(newMatrix.data).to.deep.equal([1,2,3]);
            assert.equal(newMatrix.columnsLength,3);
            assert.equal(newMatrix.rowsLength,1);

            newMatrix = new Matrix([1,2,3],1);
            expect(newMatrix.data).to.deep.equal([1,2,3]);
            assert.equal(newMatrix.columnsLength,3);
            assert.equal(newMatrix.rowsLength,1);

        });

    });

    describe("#add()", function(){

        it('should be able to add two 2x2 matrices',function () {
            expect(matrix2x2.add(matrix2x2).data).to.be.deep.equal([8,  2,  4,  6]);
        });

        it('should fail if different size',function(){
            expect(function(){ matrix2x2.add(matrix3x1)}).to.throw(Error);
            expect(function(){ matrix2x2.add(matrix2x2)}).to.not.throw(Error);
            expect(function(){ matrix2x2.add(matrix4x4)}).to.throw(Error);
            expect(function(){ vec3.add(vec4)}).to.throw(Error);
        });

        it('should be able to add two 2d vectors',function () {
            expect(vec2.add(new Matrix([3,4])).data).to.be.deep.equal([5,8]);
            expect((new Matrix([3,-1],1,2)).add(new Matrix([3,4])).data).to.be.deep.equal([6,3]);
        });

        it('should be able to chain add operations together',function () {
            expect(vec2.add(vec2).add(vec2).add(vec2).data).to.be.deep.equal([8,16]);
            expect(vec2.add(vec2).add(vec2).add(vec2).add(new Matrix([-1,-1])).data).to.be.deep.equal([7,15]);
        })

    });

    describe("#subtract()", function(){

        it('should be able to subtract two 2x2 matrices',function () {
            expect(matrix2x2.subtract(matrix2x2).data).to.be.deep.equal([0,  0,  0,  0]);
        });

        it('should fail if different size',function(){
            expect(function(){ matrix2x2.subtract(matrix3x1)}).to.throw(Error);
            expect(function(){ matrix2x2.subtract(matrix2x2)}).to.not.throw(Error);
            expect(function(){ matrix2x2.subtract(matrix4x4)}).to.throw(Error);
            expect(function(){ vec3.subtract(vec4)}).to.throw(Error);
        });

        it('should be able to subtract two 2d vectors',function () {
            expect(vec2.subtract(new Matrix([3,4])).data).to.be.deep.equal([-1,0]);
            expect((new Matrix([3,-1],1,2)).subtract(new Matrix([3,4])).data).to.be.deep.equal([0,-5]);
        });

        it('should be able to chain subtract operations together',function () {
            //[2,4]
            expect(vec2.subtract(vec2).subtract(vec2).subtract(vec2).data).to.be.deep.equal([-4,-8]);
            expect(vec2.subtract(vec2).subtract(vec2).subtract(vec2).subtract(new Matrix([-1,-1])).data).to.be.deep.equal([-3,-7]);
        })

    });

    describe("#scalarMultiply()", function(){

        it('should be able to scalar muliply a 2x2 matrix',function () {
            expect(matrix2x2.scalarMultiply(2).data).to.be.deep.equal([8,  2,  4,  6]);
        });

        it('should fail if invalid input',function(){
            expect(function(){ matrix2x2.scalarMultiply(matrix3x1)}).to.throw(Error);
            //expect(function(){ matrix2x2.scalarMultiply(2.3)}).to.not.throw(Error);
            //expect(function(){ matrix2x2.scalarMultiply('matrix4x4')}).to.throw(Error);
           // expect(function(){ vec3.scalarMultiply(vec4)}).to.throw(Error);
        });

        it('should be able to scalarMultiply 2d vectors',function () {
            expect(vec2.scalarMultiply(-2).data).to.be.deep.equal([-4,-8]);
        });

        it('should be able to chain scalarMultiply operations together',function () {
            //[2,4]
            expect(vec2.scalarMultiply(1).scalarMultiply(2).scalarMultiply(3).data).to.be.deep.equal([12,24]);
            expect(vec2.scalarMultiply(34).scalarMultiply(53).scalarMultiply(0).scalarMultiply(12334).data).to.be.deep.equal([0,0]);
        })

    });

    describe("#isSameDimension()", function(){
        it('should return the true if two matrices have the same dimensions',function(){
            expect(vec3.isSameDimension(vec3)).to.equal(true);
            expect(vec2.isSameDimension(vec2)).to.equal(true);
            expect(matrix3x2.isSameDimension(matrix3x2)).to.equal(true);
            expect(matrix3x2.isSameDimension(new Matrix([1,2,3,1,2,3],3,2))).to.equal(true);
        })

        it('should return the false if two matrices are not the same dimensions',function() {
            expect(vec2.isSameDimension(vec3)).to.equal(false);
            expect(vec2.isSameDimension(new Matrix([1]))).to.equal(false);
        });
    });

    describe("#equal()", function(){
        it('should return the true if two matrices are identical',function(){
            expect(vec3.equal(vec3)).to.equal(true);
            expect(vec2.equal(vec2)).to.equal(true);
            expect(matrix3x2.equal(matrix3x2)).to.equal(true);
            expect(matrix3x2.equal(new Matrix([2, 6, 3, 5, 14, 41],3,2))).to.equal(true);
        })

        it('should return the true if two matrices are not identical',function(){
            expect(vec2.equal(vec3)).to.equal(false);
            expect(matrix3x2.equal(new Matrix([1,2,3,1,2,3],3,2))).to.equal(false);
        })

    });

    describe("#transpose()", function(){
        it('should return the same matrix if chained an equal number of times',function(){
            expect(vec3.transpose().transpose()).to.deep.equal(vec3);
            expect(vec3.transpose()).to.deep.not.equal(vec3);
            expect(vec2.transpose().transpose()).to.deep.equal(vec2);
            expect(matrix3x2.transpose().transpose()).to.deep.equal(matrix3x2);
            expect(matrix3x2.transpose().transpose().transpose().transpose()).to.deep.equal(matrix3x2);
            expect(matrix4x4.transpose().transpose()).to.deep.equal(matrix4x4);

        });

        it('should return the transposed matrix',function(){
            expect(vec2.transpose()).to.deep.equal(new Matrix([2,4],2,1));
            expect(matrix2x2.transpose()).to.deep.equal(new Matrix([4,2,1,3],2,2));
            expect(matrix2x3.transpose()).to.not.deep.equal(matrix3x2);
            expect(matrix2x3.transpose()).to.deep.equal(new Matrix([2,5,6,14,3,41],3,2));
        })


    });

    describe("#isIdentity()", function(){
        it('should return true if it is a identity matrix',function () {
            expect(new Matrix(
                [
                    1
                ]
            ).isIdentity()).to.equal(true);

            expect(new Matrix(
                [
                    0
                ]
            ).isIdentity()).to.equal(false);

            expect(new Matrix(
                [
                    1,  0,
                    0,  1
                ],2,2
            ).isIdentity()).to.equal(true);

            expect(new Matrix(
                [
                    1,  0,  0,  1
                ]
            ).isIdentity()).to.equal(false);

            expect(new Matrix(
                [
                    1,  0,  0,
                    0,  1,  0,
                    0,  0,  1
                ],3,3
            ).isIdentity()).to.equal(true);

            expect(new Matrix(
                [
                    1,  0,  0,
                    0,  1,  0,
                    0,  1,  1
                ],3,3
            ).isIdentity()).to.equal(false);

            expect(matrix4x4.isIdentity()).to.equal(false);


        })
    });

    describe('#generateIdentityMatrix()',function () {
        it("should equal to identity matrix",function () {

            for(var i = 1; i<5; i++){
                expect(Matrix.generateIdentityMatrix(i).isIdentity()).to.equal(true);
            }

            expect(Matrix.generateIdentityMatrix(3)).to.deep.equal(new Matrix(
                [
                    1,  0,  0,
                    0,  1,  0,
                    0,  0,  1
                ],3,3
            ));

        });

        it('should not accept invalid sizes',function () {
            expect(function(){Matrix.generateIdentityMatrix(0)}).to.throw(Error);
            expect(function(){Matrix.generateIdentityMatrix(-1)}).to.throw(Error);
        })

    });

    describe('#getData',function () {

        it('should be receive the correct data that it is constructed with',function () {

            expect(vec2.getData()).to.deep.equal([2,4]);

            expect(matrix3x1.getData()).to.deep.equal(
                [
                    3,
                    2,
                    1
                ]);

            expect(matrix2x2.getData()).to.not.deep.equal(
                [
                    4,  1,
                    2,  4
                ]);

            expect(matrix2x3.getData()).to.deep.equal(
                [
                    2,  6,  3,
                    5,  14, 41
                ]
            );

            expect(matrix3x2.getData()).to.deep.equal(
                [
                    2,  6,
                    3,  5,
                    14, 41
                ]
            );

            expect(matrix4x4.getData()).to.deep.equal(
                [
                    1,  2,  3,  4,
                    5,  6,  7,  8,
                    9,  10, 11, 12,
                    13, 14, 15, 16
                ]
            );

        });

        it('should let user modify internal data with returned array if safe is false', function () {

            Matrix.safe = false;

            var internalData = vec2.getData();
            internalData[0] = 1;
            expect(vec2.getData()).to.deep.equal(internalData);

        });

        it('should not let user modify internal data with returned array if safe is false', function () {

            // vec2 = new Matrix([2,4]);
            var internalData = vec2.getData();
            internalData[0] = 1;
            expect(vec2.getData()).to.deep.not.equal(internalData);

        })

    });

    describe('#multiply()',function () {
        it('vec2 x vec2(T) should equal 20',function () {
            expect(vec2.multiply(vec2.transpose())).to.deep.equal(new Matrix([20]));
        })

        it('2x2matrix x 2x2matrix should be the correct value',function () {
            expect(matrix2x2.multiply(matrix2x2).data).to.deep.equal([18,7,14,11]);
        })
    });

    describe('#aliases',function () {
        it('verifying aliases',function () {

            expect(vec2.sub).to.equal(vec2.subtract);
            expect(vec2.T).to.equal(vec2.transpose);
            expect(vec2.eq).to.equal(vec2.equal);
            expect(vec2.sm).to.equal(vec2.scalarMultiply);
            expect(vec2.sm).to.not.equal(vec2.eq);
            expect(vec2.m).to.equal(vec2.multiply);

        })
    });

});