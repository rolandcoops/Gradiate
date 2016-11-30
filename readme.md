# Usage

1. Include */lib/Gradiate.js* in your build

2. Gradiate.get( count, array ) is revealed in global.


```javascript
// Gradiate.get() returns an object with array properties .hex .rgb and .rgbCsv
let paletteObj = Gradiate.get( 8, ['#46b1d9', '#64cf54', '#ffd544'] );
	console.log( paletteObj.hex );
	console.log( paletteObj.rgb );
	console.log( paletteObj.rgbCsv );

// second example (array of [r,g,b] to comma-separated string 'r,g,b')
let paletteCsv = Gradiate.get( 11, [ [70, 177, 217], [100, 207, 84], [255, 213, 68] ] ).rgbCsv;
```


**Note:** If invalid input is supplied as the array argument, a fallback color of [0,0,0] will be used.



# Browser Support

IE9+ as post-babel build (lib folder) uses ES5 features. Pre-babel build (src folder) will work in IE11+.

Note: If running in enterprise mode, ES5 features such as Array.isArray() might have to be polyfilled!



# Dependencies

None for usage, check package.json for build & test dev-dependencies
