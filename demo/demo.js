// Quick & Simple Demo

var suchColors = [
    '#46b1d9',
    '#64cf54',
    '#ffd544',
    '#d24d44'
];

var count = suchColors.length;

var q1 = Gradiate.get( 500, suchColors ).hex;
var q2 = Gradiate.get( count+4, suchColors ).hex;
var q3 = Gradiate.get( count+3, suchColors ).hex;
var q4 = Gradiate.get( count+2, suchColors ).hex;
var q5 = Gradiate.get( count+1, suchColors ).hex;
var q0 = suchColors;

demoPalette(q1, 'q1');
demoPalette(q2, 'q2');
demoPalette(q3, 'q3');
demoPalette(q4, 'q4');
demoPalette(q5, 'q5');
demoPalette(q0, 'q0');

function demoPalette( paletteArr, divHandle )
{
    for( var i=0, l=paletteArr.length; i<l; i++ )
    {
        var newDiv = document.createElement( 'div' );

            newDiv.className = "palette-fragment";
            newDiv.style.backgroundColor = paletteArr[i].toString();
            newDiv.title = paletteArr[i].toString();

        document.getElementById( divHandle ).appendChild( newDiv );
    }
}
