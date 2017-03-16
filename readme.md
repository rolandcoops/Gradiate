# About

[![Build Status](https://travis-ci.org/rolandcoops/Gradiate.svg?branch=master)](https://travis-ci.org/rolandcoops/Gradiate)

**Standalone, lightweight and simple gradient generation tool**

Want to get a palette array of interpolated color values of any length, based on an input array? Covered!

  - Useful for e.g. quantitative data visualizations with n categories.
  - Accepts [r,g,b] || 'r, g, b' || 'r,g,b' || '#hexhex' || '#hex'
  - Returns { [r,g,b], 'r, g, b', '#hexhex' }

[Simple demo](https://cdn.rawgit.com/rolandcoops/Gradiate/master/demo/demo.html "via rawgit.com")



# Installation

1. Include */lib/Gradiate.js* in your build

2. 'Gradiate.get( count, array )' is revealed in global.

**Note:** If invalid input is supplied as the array argument, a fallback color of [0,0,0] will be used.



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



# Browser Support

Compiled production build (lib folder) will work in IE9+ (compiled with babeljs).  
Pre-compiled development build (src folder) will work as-is in IE11+.

**Note**: If running in enterprise mode, ES5 features such as Array.isArray() might have to be polyfilled!



# Dependencies

None for usage, check package.json for build & test dev-dependencies (or simply run 'npm install')
