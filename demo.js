// WIP logging for development:

var count = 3;

perfTest1();
perfTest2();
perfTest3();
perfTest4();
perfTest5();
perfTest6();
perfTest7();

function perfTest1() {
    var test = Gradiate.get(count, [
        [50, 150, 200],
        [250, 100, 150],
        [50, 100, 50]
    ]);
    // console.log('test1', test.hex);
}


function perfTest2() {
    var test = Gradiate.get(count);
    // console.log('test2', test.hex);
}


function perfTest3() {
    var test = Gradiate.get(count, [
        [50, 150, 200], {
            foo: 'bar'
        },
        [50, 100, 50]
    ]);
    // console.log('test3', test.hex);
}


function perfTest4() {
    var test = Gradiate.get(count, [
        '50, 150, 200',
        '250, 100, 150',
        '50, 100, 50'
    ]);
    // console.log('test4', test.hex);
}


function perfTest5() {
    var test = Gradiate.get(count, [
        ['50', '150', '200'],
        ['250', '100', '150'],
        ['50', '100', '50']
    ]);
    // console.log('test5', test.hex);
}

function perfTest6() {
	var test = Gradiate.get(count, [
        [50, 150, 200],
        [250, 100, 150],
        [50, 100, 50],
        [250, 100, 150],
        [50, 150, 200],
        [100, 200, 0],
        [50, 150, 200],
        [250, 100, 150],
        [50, 100, 50],
        [250, 100, 150],
        [50, 150, 200],
        [100, 200, 0],
        [50, 100, 50],
        [250, 100, 150],
        [50, 150, 200],
        [100, 200, 0],
        [50, 150, 200],
        [250, 100, 150],
        [50, 100, 50],
        [250, 100, 150],
        [50, 150, 200],
        [100, 200, 0]
    ]);
    // console.log('test6', test.hex);
}

function perfTest7() {
	var test = Gradiate.get(count, [
		"3296c8",
		"#fa6496",
		"326432"
	]);
	// console.log('test7', test.hex);
}
