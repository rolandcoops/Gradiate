// TODO: DEV:
// 1 USE BABEL (because of the let/const)
// 2 USE MINIFY / UGLIFY

var Gradify = ( function GradifyModule( publicAPI ) {

	"use strict";

	let delimRgbpatt = /(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})/;
	let hex3Patt = /^([0-9a-f]{3})$/i;
	let hex6Patt = /^([0-9a-f]{6})$/i;

	// Local scope Number.isInteger() polyfill (from MDN)
	function isInteger( v ) {
		return ( typeof v === 'number' && isFinite( v ) && Math.floor( v ) === v );
	};


	// Limit RGB channel value to 0 >= v <= 255
	function limitChannel( channel )
	{
		// If channel is a number, return range-limited number, else, 'silent fail' to 0
		const channelInt = parseInt( channel, 10 );
		return ( isInteger( channelInt ) )
			? Math.min( Math.max( channelInt, 0 ), 255 )
			: 0;
	}


	function hexToRgb( hexCode )
	{
		let formatFn = function( value ) {
			value = ( typeof( value === 'string' ) )
				? value.replace( /[^0-9a-f]/gi, '' )
				: '000000';

			if ( hex3Patt.test( value ) )
			{
				value = '' + value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
			}

			return ( hex6Patt.test( value ) )
				? value
				: '000000';
		};

		let parseFn = function( value ) {
			let p = parseInt( value, 16 );
			return p;
		};

		// format & validate hexCode
		hexCode = formatFn( hexCode );

		return [
			parseFn( hexCode.substr( 0, 2 ) ),
			parseFn( hexCode.substr( 2, 2 ) ),
			parseFn( hexCode.substr( 4, 2 ) )
		];
	}


	function rgbToHex( array )
	{
		let parseFn = function( value ) {
			let p = value.toString( 16 );
			return ( p.length === 1 )
				? '0' + p
				: p;
		};

		let valid = ( Array.isArray( array ) && array.length === 3 );

		return ( valid )
			? "#" + parseFn( array[0] ) + parseFn( array[1] ) + parseFn( array[2] )
			: '#000000';
	}


	function delimitRgb( array )
	{
		return array[0]+','+array[1]+','+array[2];
	}


	function relimitRgb( string )
	{
		let tryExec = delimRgbpatt.exec( string );
		return ( tryExec )
			? tryExec.slice( 1 )
			: [0, 0, 0];
	}


	function getPalette( count, array )
	{
		let palette = [];

	    let step = ( array.length - 1 ) / ( count - 1 );
	        step = ( isFinite( step ) )
				? step
				: ( array.length - 1 ); // check to catch divide by 0

		for( let i=0; i<count; i++ )
	    {
	        // variable for index translation between count an input array length
	        let interpolate = i * step;

			// calculate index in array[] before and after index point in palette[i]
	        // floor/ceil automatically prevents min or max breakpoints from getting out of bound.
	        let pre = Math.floor(interpolate);
	        let post = Math.ceil(interpolate);

	        // calculate relative position between before and after index of array[] (will be a decimal leftover)
	        let position = interpolate - pre;

			// push new r,g,b array to output palette array
	        palette.push([
				parseInt( array[pre][0] + ( array[post][0] - array[pre][0] ) * position, 10 ),
				parseInt( array[pre][1] + ( array[post][1] - array[pre][1] ) * position, 10 ),
				parseInt( array[pre][2] + ( array[post][2] - array[pre][2] ) * position, 10 )
	        ]);
	    }

		return palette;
	}


	publicAPI.get = function( count, input ) {
		let valid = false; // if input is invalid or contains invalid data, resort to fallback value
		let parseInput;

		if( Array.isArray( input ) && input.length > 0 ) {
			// input is an array, assume input is valid until proven otherwise in input.map( fn )
			valid = true;

			// parse input parameter to [ [num, num, num] ] to make it predictable
			parseInput = input.map( function( o ) {

				if( typeof o === 'string')
				{
					if( o.match( hex6Patt ) || o.match( hex3Patt ) )
					{
						return hexToRgb( o ).map( limitChannel );
					}
					else if( o.match( delimRgbpatt ) )
					{
						return relimitRgb( o ).map( limitChannel );
					}
				}
				else if( Array.isArray( o ) && o.length === 3 )
				{
					// TODO: check if array values are numerical
					return o.map( limitChannel );
				}

				// set to false again if we find a value that doesn't match expected types/format
				valid = false;
			});
		}

		// if invalid, return
		let palette = ( valid )
			? getPalette( count, parseInput )
			: getPalette( count, [[0,0,0]] );

		return {
			rgb: 		palette,
			rgbCsv: 	palette.map( delimitRgb ),
			hex: 		palette.map( rgbToHex )
		};
	};


	return publicAPI;

}( Gradify || {} ) );
