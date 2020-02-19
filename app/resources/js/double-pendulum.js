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
    doublePendulum();
}

function doublePendulum(){
    madePendulumType1();
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

function getDirectionType1(){
	return Math.sin(angle1) * (-gravity) * ((coordinateConstant * mass1) + mass2);
}

function getDirectionType2(){
	return Math.sin(angle1 - angle2) * coordinateConstant;
}

function getWayType1(){
	return Math.sin(angle1 - (coordinateConstant * angle2)) * mass2 * (-gravity);
}

function getWayType2(){
	return ((mass1 + mass2) * length1) * (velocity1 * velocity1);
}

function getSpeedType1(){
	return (mass2 * Math.sin(angle1 - angle2)) * (-coordinateConstant);
}

function getSpeedType2(){
	return Math.cos(angle1) * gravity * (mass1 + mass2);
}

function getRapidityType1(){
	return (((length1 * Math.cos(angle1 - angle2)) * velocity1) * velocity1) + ((velocity2 * length2) * velocity2);
}

function getRapidityType2(){
	return (Math.cos(angle1 - angle2) * mass2) * ((velocity2 * length2) * velocity2);
}

function getOscillation(length){
    let oscillation = mass2 - (Math.cos((coordinateConstant * angle1) - (coordinateConstant * angle2)) * mass2) + (coordinateConstant * mass1);
	
	return oscillation * length;
}

function getOscillationType1(){
	return getOscillation(length1);
}

function getOscillationType2(){
	return getOscillation(length2);
}

function getPendulumType1(){
	let direction = getDirectionType1();
	let way = getWayType1();
	let speed = getSpeedType1();
	let rapidity = getRapidityType1();
	let oscillation = getOscillationType1();	
	let pendulumType1 = ((speed * rapidity) + direction + way) / oscillation;
	
	return pendulumType1;
}

function madePendulumType1(){
	let pendulumType1 = getPendulumType1();
	
	acceletation1 = pendulumType1;
	velocity1 = velocity1 + pendulumType1;
	angle1 = angle1 + velocity1;
}