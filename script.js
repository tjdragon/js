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

}

function anim(from, to) {
	
}

setTimeout(tjCallback, interval)