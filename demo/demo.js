// Quick & Simple Demo

let suchColors = [
    '#46b1d9',
    '#64cf54',
    '#ffd544',
    '#d24d44'
];

let count = suchColors.length;

let q1 = Gradiate.get( 500, suchColors ).hex;
let q2 = Gradiate.get( count+4, suchColors ).hex;
let q3 = Gradiate.get( count+3, suchColors ).hex;
let q4 = Gradiate.get( count+2, suchColors ).hex;
let q5 = Gradiate.get( count+1, suchColors ).hex;
let q0 = Gradiate.get( count, suchColors ).hex;

demoPalette(q1, 'q1');
demoPalette(q2, 'q2');
demoPalette(q3, 'q3');
demoPalette(q4, 'q4');
demoPalette(q5, 'q5');
demoPalette(q0, 'q0');

function demoPalette( paletteArr, divHandle )
{
    for( let i=0, l=paletteArr.length; i<l; i++ )
    {
        let newDiv = document.createElement( 'div' );

            newDiv.className = "palette-fragment";
            newDiv.style.backgroundColor = paletteArr[i].toString();
            newDiv.title = paletteArr[i].toString();

        document.getElementById( divHandle ).appendChild( newDiv );
    }
}


// WIP logging for development:

// var count = 10000;
//
// perfTest1();
// perfTest2();
// perfTest3();
// perfTest4();
// perfTest5();
// perfTest6();
// perfTest7();
//
// function perfTest1() {
//     var test = Gradiate.get(count, [
//         [50, 150, 200],
//         [250, 100, 150],
//         [50, 100, 50]
//     ]);
//     // console.log('test1', test.hex);
// }
//
//
// function perfTest2() {
//     var test = Gradiate.get(count);
//     // console.log('test2', test.hex);
// }
//
//
// function perfTest3() {
//     var test = Gradiate.get(count, [
//         [50, 150, 200], {
//             foo: 'bar'
//         },
//         [50, 100, 50]
//     ]);
//     // console.log('test3', test.hex);
// }
//
//
// function perfTest4() {
//     var test = Gradiate.get(count, [
//         '50, 150, 200',
//         '250, 100, 150',
//         '50, 100, 50'
//     ]);
//     // console.log('test4', test.hex);
// }
//
//
// function perfTest5() {
//     var test = Gradiate.get(count, [
//         ['50', '150', '200'],
//         ['250', '100', '150'],
//         ['50', '100', '50']
//     ]);
//     // console.log('test5', test.hex);
// }
//
// function perfTest6() {
// 	var test = Gradiate.get(count, [
//         [50, 150, 200],
//         [250, 100, 150],
//         [50, 100, 50],
//         [250, 100, 150],
//         [50, 150, 200],
//         [100, 200, 0],
//         [50, 150, 200],
//         [250, 100, 150],
//         [50, 100, 50],
//         [250, 100, 150],
//         [50, 150, 200],
//         [100, 200, 0],
//         [50, 100, 50],
//         [250, 100, 150],
//         [50, 150, 200],
//         [100, 200, 0],
//         [50, 150, 200],
//         [250, 100, 150],
//         [50, 100, 50],
//         [250, 100, 150],
//         [50, 150, 200],
//         [100, 200, 0]
//     ]);
//     // console.log('test6', test.hex);
// }
//
// function perfTest7() {
// 	var test = Gradiate.get(count, [
// 		"3296c8",
// 		"#fa6496",
// 		"326432"
// 	]);
// 	// console.log('test7', test.hex);
// }
