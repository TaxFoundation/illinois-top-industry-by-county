var fills = {
  1: '#0094ff',
  2: '#e91e63',
  3: '#9c27b0',
  4: '#3f51b5',
  5: '#b71c1c',
  6: '#00bcd4',
  7: '#009688',
  8: '#4caf50',
  9: '#ffeb3b',
  10: '#ffc107',
  11: '#ff9800',
  12: '#f44336'
};

var pickFill = function (county) {
  if (county.sectorTwo) {
    // If the county has a tie between two industries, add a new SVG pattern to fill that county
    var pattern = d3.select('defs').append('pattern')
      .attr('id', county.county + 'Pattern')
      .attr('width', 100)
      .attr('height', 100)
      .attr('x', 0)
      .attr('y', 0)
      .attr('patternUnits', 'userSpaceOnUse');

    pattern.append('rect')
      .attr('width', 100)
      .attr('height', 100)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', fills[county.sectorOne]);

    pattern.append('polygon')
      .attr('points', '0,0 30,0 100,70 100,100 70,100 0,30')
      .attr('fill', fills[county.sectorTwo]);

    pattern.append('polygon')
      .attr('points', '70,0 100,0 100,30')
      .attr('fill', fills[county.sectorTwo]);

    pattern.append('polygon')
      .attr('points', '0,70 0,100 30,100')
      .attr('fill', fills[county.sectorTwo]);

    return 'url("#' + county.county + 'Pattern")';

  } else {

    return fills[county.sectorOne];

  }
};

d3.json('illinois-industries.json', function(d){

  for (var i = 0, j = d.length; i < j; i++) {
    d3.select('#' + d[i].county).attr('fill', pickFill(d[i]));
  }

});