const canvasId1 = "canvas-1";
const canvasId2 = "canvas-2";
const lineCap = "round";
const coordinateConstant = 2;

let gravity = getRandomArbitrary(0.50, 1);

let mass1 = getRandomArbitrary(8, 12);
let mass2 = getRandomArbitrary(5, 8);

let radius1 = getRandomArbitrary(0.15, 0.25);
let radius2 = getRandomArbitrary(0.15, 0.25);

let angle1 = getRandomAngle();
let angle2 = getRandomAngle();

let velocity1 = 0;
let velocity2 = 0;

let acceletation1 = 0;
let acceletation2 = 0;

let canvas1 =  getCanvas(canvasId1);
let canvas2 =  getCanvas(canvasId2);

let context1 = canvas1.getContext("2d");
let context2 = canvas2.getContext("2d");

setCanvasWidthAndHeight(canvas1);
setCanvasWidthAndHeight(canvas2);

context1.lineWidth = getRandomArbitrary(4, 4);
context1.lineCap = lineCap;

let width = innerWidth;
let height = innerHeight;

let length1 = getPendulumLength(width, height, radius1);
let length2 = getPendulumLength(width, height, radius2);

let lastCoordinateX = startCoordinate(width, true);	
let lastCoordinateY = startCoordinate(height, false);

animation();

function animation(){
    canvasClearRect(context1);
}

function getCanvas(canvasId){
    return document.getElementById(canvasId);
}

function setCanvasWidthAndHeight(canvas){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

function getPendulumLength(width, height, radius){
    return Math.min(width,height) * radius;
}

function getRandomAngle(){
    return Math.PI/Math.random();
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function startCoordinate(length, isSin){
    let coordinate = length/coordinateConstant;
	if(isSin){
		return startCoordinateSin(coordinate);
	}
	
	return startCoordinateCos(coordinate);
}

function startCoordinateSin(coordinate){
	return (coordinate + length1 * Math.sin(angle1)) + length2 * Math.sin(angle2);
}

function startCoordinateCos(coordinate){
	return (coordinate + length2 * Math.cos(angle2)) + length1 * Math.cos(angle1);
}

function canvasClearRect(canvas){
    canvas.clearRect(0, 0, width, height);
}