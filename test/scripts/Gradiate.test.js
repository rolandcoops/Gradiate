/*
 	Unit tests for Gradiate.js
*/
'use strict';

describe('Gradiate.js', function () {

    // Gradiate.get(quantity, inputArray)
    describe('Gradiate.get() general', function () {

        it('Should return interpolated array using specified quantity', function () {
            expect(
                Gradiate.get(5, [ [100, 100, 100], [0, 0, 0] ]).rgb.length
            ).toEqual(5);

            expect(
                Gradiate.get(5, [ [100, 100, 100], [0, 0, 0] ]).hex.length
            ).toEqual(5);

            expect(
                Gradiate.get(5, [ [100, 100, 100], [0, 0, 0] ]).rgbCsv.length
            ).toEqual(5);

            expect(
                Gradiate.get(10, [ [100, 100, 100], [50, 50, 50], [0, 0, 0] ]).rgb.length
            ).toEqual(10);
        });

        it('Should accept input arrays of [r,g,b], "r,g,b", "#HEXHEX", "HEXHEX"', function () {
            expect(
                Gradiate.get(5, [ [100, 100, 100], [0, 0, 0] ]).rgb
            ).toEqual([ [100, 100, 100], [75, 75, 75], [50, 50, 50], [25, 25, 25], [0, 0, 0] ]);

            expect(
                Gradiate.get(5, [ ['100', '100', '100'], ['0', '0', '0'] ]).rgb
            ).toEqual([ [100, 100, 100], [75, 75, 75], [50, 50, 50], [25, 25, 25], [0, 0, 0] ]);

            expect(
                Gradiate.get(5, [ '100, 100, 100', '0,0,0' ]).rgb
            ).toEqual([ [100, 100, 100], [75, 75, 75], [50, 50, 50], [25, 25, 25], [0, 0, 0] ]);

            expect(
                Gradiate.get(5, [ '#646464', '#000000' ]).rgb
            ).toEqual([ [100, 100, 100], [75, 75, 75], [50, 50, 50], [25, 25, 25], [0, 0, 0] ]);

            expect(
                Gradiate.get(5, [ '646464', '000000' ]).rgb
            ).toEqual([ [100, 100, 100], [75, 75, 75], [50, 50, 50], [25, 25, 25], [0, 0, 0] ]);
        });

    });

    describe('Gradiate.get() fallbacks & robustness', function () {

        it('Should return fallback palette when array argument is not defined, not an array or is not populated', function () {
            expect(
                Gradiate.get(2, []).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);

            expect(
                Gradiate.get(2).hex
            ).toEqual([ '#000000', '#000000' ]);

            expect(
                Gradiate.get(2, 'test').rgbCsv
            ).toEqual([ '0,0,0', '0,0,0' ]);

            expect(
                Gradiate.get(2, new Date()).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);
        });

        it('Should limit output colors to RGB channel values 0-255', function () {
            expect(
                Gradiate.get(2, [ [-1000, -1000, -1000], [1000, 1000, 1000] ]).hex
            ).toEqual([ '#000000', '#ffffff' ]);
        });

        it('Should return fallback palette when an invalid hex is encountered', function () {
            expect(
                Gradiate.get(2, [ '#tttttt', '#ac2e63' ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);
            expect(
                Gradiate.get(2, [ '#ttttttttttt', '#ac2e63' ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);
        });

        it('Should return fallback palette when an invalid comma-separated "r,g,b" is encountered', function () {
            expect(
                Gradiate.get(2, [ '100 100 100', '50, 50, 50' ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);
            expect(
                Gradiate.get(2, [ '100/ 100/ 100', '50, 50, 50' ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);
        });

        it('Should return fallback palette when array argument subarrays are invalid', function () {
            expect(
                Gradiate.get(2, [ [100, 100], [50, 50, 50] ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);

            expect(
                Gradiate.get(2, [ [100, 100, 100, 100], [50, 50, 50] ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);

            expect(
                Gradiate.get(2, [ new Date(), [50, 50, 50] ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);

            expect(
                Gradiate.get(2, [ [ [ 100, 100, 100 ] ], [50, 50, 50] ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);

            expect(
                Gradiate.get(2, [ 'definately not a color value', [50, 50, 50] ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);

            expect(
                Gradiate.get(2, [ [100, 100, 100], { isColor: false } ]).rgb
            ).toEqual([ [0, 0, 0], [0, 0, 0] ]);
        });

    });

});
