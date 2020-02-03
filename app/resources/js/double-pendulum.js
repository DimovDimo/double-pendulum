const canvasId1 = "canvas-1";
const canvasId2 = "canvas-2";

let gravity = getRandomArbitrary(0.75, 1.25);

let mass1 = getRandomArbitrary(8, 12);
let mass2 = getRandomArbitrary(5, 8);

let radius1 = getRandomArbitrary(0.15, 0.25);
let radius2 = getRandomArbitrary(0.15, 0.25);

let angle1 = getRandomAngle();
let angle2 = getRandomAngle();

let lastCoordinateX = 0;
let lastCoordinateY = 0;

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

let width = innerWidth;
let height = innerHeight;

let length1 = getPendulumLength(width, height, radius1);
let length2 = getPendulumLength(width, height, radius2);

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