const interval = 800;
const w = d3.select('#svg-playground').attr('width');
const h = d3.select('#svg-playground').attr('height');

var count = 0;
var p1 = undefined;
var p2 = undefined;

class TjPoint {
	constructor(id, x, y) {
		this._id = id;
		this._x = x;
		this._y = y;
	}
}

function tjCallback() {
	console.log("tjCallback");

	const x = Math.floor((Math.random() * w) + 1);
	const y = Math.floor((Math.random() * h) + 1);
	let myPoint = new TjPoint('p' + count, x, y);

    addPoint(myPoint);

    if (p1 == 'undefined') p1 = myPoint;
    else if (p2 == 'undefined') p2 = myPoint;
    else {
    	p1 = p2;
    	p2 = myPoint;
    }

    if (p1 && p2) {
    	drawLine(p1, p2);
    	anim(p1, p2);
    }

	count = count + 1;
}

function addPoint(tjPoint) {
	console.log("addPoint " + tjPoint);

	const pointsContainer = d3.select('#p-points');
	const circle = pointsContainer.append('div')
	                              .attr('class', 'circle p-point')
	                              .attr('id', tjPoint._id);
	tjPoint.noreRef = circle;
	circle.style('left', tjPoint._x + 'px')
	      .style('top', tjPoint._y + 'px');
	circle.append('span')
	      .attr('class', 'pulse');
}

function drawLine(from, to) {
	const lines = d3.select('#svg-lines');
	const lineId = 'l-' + from._id + '-' + to._id;
	from.lineId = lineId;

	lines.append('path')
	     .attr('class', 'svg-line')
	     .attr('id', lineId)
	     .attr('d', 'M' + from._x + "," + from._y + ' L' + to._x + ',' + to._y);
}

function anim(from, to) {
	const walker = d3.select('#walker');
	walker.style('display', 'block')
	      .style('transform', `translate(${from._x}px, ${from._y}px)`);
	walker.transition()
	      .duration(interval * .9)
	      .styleTween('transform', function() {
	      	const interpolateX = d3.interpolate(from._x, to._x);
	      	const interpolateY = d3.interpolate(from._y, to._y);
	      	return function(t) {
	      		return `translate(${interpolateX(t)}px, ${interpolateY(t)}px`;
	      	};
	      })
	      .on("end", function() {
	      	to.noreRef.classed('pulsing', true);
	      	d3.select('#' + from._id).remove();
	      	d3.select('#' + from.lineId).remove();	      	
	      });
}

// setTimeout(tjCallback, interval)
// setTimeout(tjCallback, interval)
setInterval(tjCallback, interval)