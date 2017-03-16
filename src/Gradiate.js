/**
 * Gradiate Module
 * by Roland Coops
 *
 * Quick Usage example (try in console):
 * Gradiate.get(5, ['#46b1d9', '#64cf54', '#ffd544']).hex;
 */


exports.Gradiate = ( function GradiateModule( publicAPI ) {

	"use strict";

	const fallbackRgb = [0, 0, 0];

	const delimRgbPatt = /(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})/;
	const hex3Patt = /^#?([0-9a-f]{3})$/i;
	const hex6Patt = /^#?([0-9a-f]{6})$/i;


	// Local scope Number.isInteger() polyfill (from MDN)
	const isInteger = v => ( typeof v === 'number' && isFinite( v ) && Math.floor( v ) === v );


	// limit an integer between two values
	const limitInteger = (val, min, max) => Math.min( Math.max( val, min ), max );


	// Limit RGB channel value to 0 >= v <= 255
	const limitChannel = ( channel ) => {
		// If channel can be coerced to an int, return range-limited number, else, 'silent fail' to 0
		const channelInt = parseInt( channel, 10 );
		return isInteger( channelInt ) ? limitInteger( channelInt, 0, 255 ) : 0;
	};


	// parse comma separated RGB string to [r, g, b] array
	const relimitRgb = str => delimRgbPatt.exec( str ).slice( 1 );


	function hexToRgb( hexCode )
	{
		const formatFn = ( value ) => {
			let v = value.replace( /[^0-9a-f]/gi, '' );
			return hex3Patt.test( v ) ? ''+v[0]+v[0]+v[1]+v[1]+v[2]+v[2] : v;
		};

		// parse 10-base to 16-base (hex)
		const parseFn = value => parseInt( value, 16 );

		// format & validate hexCode
		const formattedHex = formatFn( hexCode );

		return [0,2,4].map( pos => parseFn( formattedHex.substr( pos, 2 ) ) );
	}


	// convert [r, g, b] array to hexcode string
	function rgbToHex( arr )
	{
		const parseFn = value => {
			const str = value.toString( 16 );
			return ( str.length === 1 ) ? '0'+str : str;
		};

		return `#${ arr.map( parseFn ).join( '' ) }`;
	}


	function getPalette( count, arr )
	{
		let palette = [];

		// calculate step translation between input & output arrays
	    let step = ( arr.length - 1 ) / ( count - 1 );
	        step = ( isFinite( step ) ) ? step : ( arr.length - 1 ); // check to catch divide by 0

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
	        palette.push( [0,1,2].map( channel => {
				return parseInt( arr[pre][channel] + ( arr[post][channel] - arr[pre][channel] ) * position, 10 );
			}));
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
		let palette = ( valid ) ? getPalette( count, parseInput ) : getPalette( count, [fallbackRgb] );

		return {
			rgb: 		palette,
			rgbCsv: 	palette.map( arr => arr.join() ),
			hex: 		palette.map( rgbToHex )
		};
	};


	return publicAPI;

}( {} ) );
