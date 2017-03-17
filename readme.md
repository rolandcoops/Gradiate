# About

[![Build Status](https://travis-ci.org/rolandcoops/Gradiate.svg?branch=master)](https://travis-ci.org/rolandcoops/Gradiate)

**Standalone, lightweight and simple gradient generation tool**

Want to get a palette array of interpolated color values of any length, based on an input array? Covered!

  - Useful for e.g. quantitative data visualizations with *n* categories.
  - Accepts [r,g,b] || 'r, g, b' || 'r,g,b' || '#hexhex' || '#hex'
  - Returns { [[r,g,b]], ['r, g, b'], ['#hexhex'] }

[Simple demo](https://cdn.rawgit.com/rolandcoops/Gradiate/master/demo/demo.html "via rawgit.com")



# Installation

You can either install via npm, or manually from github:

### NPM:

```javascript
// 1. in cli:
npm install gradiate --save

// 2. in js:
import Gradiate from 'gradiate';
let palette = Gradiate.get( 42, [ [70, 177, 217], [100, 207, 84], [255, 213, 68] ] );
console.log(palette); // logs an object with returned arrays as properties .hex .rgv and .rgbCsv
```

### Manual (Github):

1. Fetch */lib/Gradiate.js* (or */src/Gradiate.js* if you don't support IE10- or are using transpiler) from the [Github page](https://github.com/rolandcoops/Gradiate)

2. Load or integrate the file in your build/bundle/.html

3. Global object 'Gradiate' with method 'Gradiate.get( countInt, coloursArr )' is accessible.



# Example Usage

```javascript
// Gradiate.get() returns an object with array properties .hex .rgb and .rgbCsv
let paletteObj = Gradiate.get( 8, ['#46b1d9', '#64cf54', '#ffd544'] );
	console.log( paletteObj.hex );
	console.log( paletteObj.rgb );
	console.log( paletteObj.rgbCsv );

// second example (array of [r,g,b] to comma-separated string 'r,g,b')
let paletteCsv = Gradiate.get( 11, [ [70, 177, 217], [100, 207, 84], [255, 213, 68] ] ).rgbCsv;
```

**Note:** If invalid input is supplied as the array argument, a fallback color of [0,0,0] will be used. The rationale behind this is that often colors are non-critical in program flow, and should thus not throw errors when incorrect input is provided.



# Browser Support

Compiled production build (lib folder) will work in IE9+ (compiled with babeljs).  
Pre-compiled development build (src folder) will work as-is in IE11+.

**General Note**: If running in IE compatibility mode, ES5 features (e.g. Array.isArray()) might have to be polyfilled.



# Dependencies

None for usage, check package.json for build & test dev-dependencies if you want to make modifications.
(or simply run 'npm install' in root of this package folder)
