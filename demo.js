// WIP logging for development:

var test = Gradify.get(7, [
	[50, 150, 200],
	[250, 100, 150],
	[50, 100, 50]
]);
console.log('test', test);


var test2 = Gradify.get(10);
console.log('test2', test2);


var test3 = Gradify.get(7, [
	[50, 150, 200],
	{ foo: 'bar' },
	[50, 100, 50]
]);
console.log('test3', test3);


var test4 = Gradify.get(7, [
	'50, 150, 200',
	'250, 100, 150',
	'50, 100, 50'
]);
console.log('test4', test4);


var test5 = Gradify.get(7, [
	['50', '150', '200'],
	['250', '100', '150'],
	['50', '100', '50']
]);
console.log('test5', test5);
