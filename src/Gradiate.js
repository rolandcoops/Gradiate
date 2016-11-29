// TODO: DEV:
// 1 USE BABEL (because of the let/const)
// 2 USE MINIFY / UGLIFY

var Gradiate = ( function GradiateModule( publicAPI ) {

	"use strict";

	let fallbackRgb = [0, 0, 0];

	let delimRgbPatt = /(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})/;
	let hex3Patt = /^#?([0-9a-f]{3})$/i;
	let hex6Patt = /^#?([0-9a-f]{6})$/i;


	// Local scope Number.isInteger() polyfill (from MDN)
	function isInteger( v ) {
		return ( typeof v === 'number' && isFinite( v ) && Math.floor( v ) === v );
	};


	// Limit RGB channel value to 0 >= v <= 255
	function limitChannel( channel )
	{
		// If channel can be coerced to an int, return range-limited number, else, 'silent fail' to 0
		const channelInt = parseInt( channel, 10 );
		return ( isInteger( channelInt ) )
			? Math.min( Math.max( channelInt, 0 ), 255 )
			: 0;
	}


	function hexToRgb( hexCode )
	{
		let formatFn = function( value ) {
			value = value.replace( /[^0-9a-f]/gi, '' );

			if ( hex3Patt.test( value ) )
			{
				value = '' + value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
			}

			return value;
		};

		let parseFn = function( value ) {
			return parseInt( value, 16 );
		};

		// format & validate hexCode
		hexCode = formatFn( hexCode );

		return [
			parseFn( hexCode.substr( 0, 2 ) ),
			parseFn( hexCode.substr( 2, 2 ) ),
			parseFn( hexCode.substr( 4, 2 ) )
		];
	}


	// convert [r, g, b] array to hexcode string
	function rgbToHex( arr )
	{
		let parseFn = function( value ) {
			let str = value.toString( 16 );
			return ( str.length === 1 )
				? '0' + str
				: str;
		};

		return "#" + parseFn( arr[0] ) + parseFn( arr[1] ) + parseFn( arr[2] );
	}


	// joining function for use by Array.map()
	function delimitRgb( arr )
	{
		return arr.join();
	}


	// parse comma separated RGB string to [r, g, b] array
	function relimitRgb( str )
	{
		let splitStr = delimRgbPatt.exec( str );
		return splitStr.slice( 1 );
	}


	function getPalette( count, arr )
	{
		let palette = [];

		// calculate step translation between input & output arrays
	    let step = ( arr.length - 1 ) / ( count - 1 );
	        step = ( isFinite( step ) )
				? step
				: ( arr.length - 1 ); // check to catch divide by 0

		for( let i=0; i<count; i++ )
	    {
	        // variable for index translation between count an input arr length
	        let interpolate = i * step;

			// calculate index in arr[] before and after index point in palette[i]
	        // floor/ceil automatically prevents min or max breakpoints from getting out of bound.
	        let pre = Math.floor(interpolate);
	        let post = Math.ceil(interpolate);

	        // calculate relative position between before and after index of arr[] (will be a decimal leftover)
	        let position = interpolate - pre;

			// push new r,g,b arr to output palette arr
	        palette.push([
				parseInt( arr[pre][0] + ( arr[post][0] - arr[pre][0] ) * position, 10 ),
				parseInt( arr[pre][1] + ( arr[post][1] - arr[pre][1] ) * position, 10 ),
				parseInt( arr[pre][2] + ( arr[post][2] - arr[pre][2] ) * position, 10 )
	        ]);
	    }

		return palette;
	}


	publicAPI.get = function( count, input ) {
		let valid = false; // if input is invalid or contains invalid data, resort to fallback value
		let parseInput;

		if( Array.isArray( input ) && input.length > 0 ) {
			// input is an arr, assume input is valid until proven otherwise in input.map( fn )
			valid = true;

			// parse input parameter to [ [num, num, num] ] to make it predictable
			parseInput = input.map( function( o ) {

				if( typeof o === 'string')
				{
					if( o.match( hex6Patt ) || o.match( hex3Patt ) )
					{
						return hexToRgb( o ).map( limitChannel );
					}
					else if( o.match( delimRgbPatt ) )
					{
						return relimitRgb( o ).map( limitChannel );
					}
				}
				else if( Array.isArray( o ) && o.length === 3 )
				{
					return o.map( limitChannel );
				}

				// set to false again if we find a value that doesn't match expected types/format
				valid = false;
			});
		}

		// if invalid, return palette of fallback rgb values
		let palette = ( valid )
			? getPalette( count, parseInput )
			: getPalette( count, [fallbackRgb] );

		return {
			rgb: 		palette,
			rgbCsv: 	palette.map( delimitRgb ),
			hex: 		palette.map( rgbToHex )
		};
	};


	return publicAPI;

}( Gradiate || {} ) );
