const canvasId1 = "canvas-1";
const canvasId2 = "canvas-2";
const lineCap = "round";
const coordinateConstant = 2;
const arcConstant = 0;
const piCoordinateConstant = Math.PI * coordinateConstant;
const contextLineWidthConstant = 2;
const contexStrokeStyleConstant = "blue";

let gravity = getRandomArbitrary(0.50, 0.75);
let radians = getRandomArbitrary(20, 30);

let mass1 = getRandomArbitrary(8, 10);
let mass2 = getRandomArbitrary(5, 7);

let radius1 = getRandomArbitrary(0.15, 0.20);
let radius2 = getRandomArbitrary(0.15, 0.20);

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

let newCoordinateWidth = 0;
let newCoordinateHeight = 0;

let coordinateX1 = 0;
let coordinateY1 = 0;

let coordinateX2 = 0;
let coordinateY2 = 0;

let radians1 = 0;
let radians2 = 0;

animation();

function animation(){
	canvasPendulum();	
	contextNewCoordinates();
	contextsLine();
	contextRadians();
	contextsStyle();
	lastCoordinates();
	requestAnimationFrame(animation);
}

function doublePendulum(){
	madePendulumType1();
    madePendulumType2();
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

function getPendulumType1(){
	let direction = getDirectionType1();
	let way = getWayType1();
	let speed = getSpeedType1();
	let rapidity = getRapidityType1();
	let oscillation = getOscillation(length1);
	let pendulumType1 = ((speed * rapidity) + direction + way) / oscillation;
	
	return pendulumType1;
}

function getPendulumType2(){
	let direction = getDirectionType2();
	let way = getWayType2();
	let speed = getSpeedType2();
	let rapidity = getRapidityType2();
	let oscillation = getOscillation(length2);
	let pendulumType2 = ((way + speed + rapidity) * direction) / oscillation;
	
	return pendulumType2;
}

function madePendulumType1(){
	let pendulumType1 = getPendulumType1();
	
	acceletation1 = pendulumType1;
	velocity1 = velocity1 + pendulumType1;
	angle1 = angle1 + velocity1;
}

function madePendulumType2(){
	let pendulumType2 = getPendulumType2();
	
	acceletation2 = pendulumType2;	
	velocity2 = velocity2 + acceletation2;
	angle2 = angle2 + velocity2;
}

function contextBeginPath(context){
	context.beginPath();
}

function getNewCoordinate(coordinate){
	return coordinate / coordinateConstant;
}

function getLineCoordinate(newCoordinate, length, angle, isSin){
	let mathAngle = 0;
	if(isSin){
		mathAngle = Math.sin(angle);
	} else {
	    mathAngle = Math.cos(angle);
	}
	
	return (mathAngle * length) + newCoordinate;
}

function contextLineTo(context, coordinateX, coordinateY){
    context.lineTo(coordinateX, coordinateY);
}

function contextStroke(context){
    context.stroke();
}

function getRadians(mass){
    return Math.sqrt((mass * radians) / Math.PI);
}

function contextArc(context, coordinateX, coordinateY, radians){
    context.arc(coordinateX, coordinateY, radians, arcConstant, piCoordinateConstant);
}

function contextLineStyle(context){
	context.lineWidth = contextLineWidthConstant;
	context.strokeStyle = contexStrokeStyleConstant;
}

function setLastCoordinates(coordinateX2, coordinateY2){
	lastCoordinateX = coordinateX2;
	lastCoordinateY = coordinateY2;
}

function canvasPendulum(){
	canvasClearRect(context1);
	doublePendulum();	
	contextBeginPath(context1);
}

function contextNewCoordinates(){
	newCoordinateWidth = getNewCoordinate(width);
	newCoordinateHeight = getNewCoordinate(height);
	context1.moveTo(newCoordinateWidth, newCoordinateHeight);
}

function contextsLine(){
	lineContext1();
	lineContext2();
}

function lineContext1(){
	coordinateX1 = getLineCoordinate(newCoordinateWidth, length1, angle1, true);
	coordinateY1 = getLineCoordinate(newCoordinateHeight, length1, angle1, false);	
	contextLineTo(context1, coordinateX1, coordinateY1);
}

function lineContext2(){
	coordinateX2 = getLineCoordinate(coordinateX1, length2, angle2, true);
	coordinateY2 = getLineCoordinate(coordinateY1, length2, angle2, false);	
	contextLineTo(context1, coordinateX2, coordinateY2);
}

function contextRadians(){
	contextStroke(context1);
	contextBeginPath(context1);
	radians1 = getRadians(mass1);
	radians2 = getRadians(mass2);	
	contextArc(context1, coordinateX1, coordinateY1, radians1);
	contextArc(context1, coordinateX2, coordinateY2, radians2);	
	context1.fill();
}

function contextsStyle(){
	contextBeginPath(context2);	
	context2.moveTo(lastCoordinateX,lastCoordinateY);
	contextLineTo(context2, coordinateX2, coordinateY2);	
	contextLineStyle(context2);	
	context2.stroke();
}

function lastCoordinates(){
	setLastCoordinates(coordinateX2, coordinateY2);
}