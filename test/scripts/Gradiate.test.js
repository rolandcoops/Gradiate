/*
 	Unit tests for Gradiate.js
*/
'use strict';

describe('Gradiate.js', function () {

    // Gradiate.get(quantity, inputArray)
    describe('Gradiate.get()', function () {

        it('Should interpolate input array using specified quantity', function () {
            expect(
                Gradiate.get(5, [ 
                    [100, 100, 100],
                    [0, 0, 0]
                ]).rgb
            ).toEqual([
                [100, 100, 100],
                [75, 75, 75],
                [50, 50, 50],
                [25, 25, 25],
                [0, 0, 0]
            ]);
        });

    });

});
