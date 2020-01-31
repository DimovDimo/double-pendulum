const canvasId1 = "canvas-1";
const canvasId2 = "canvas-2";
const gravity = 1.5;
const mass1 = 15;
const mass2 = 7;
const radius1 = 0.2;
const radius2 = 0.2;

let canvas1 =  getCanvas(canvasId1);
let canvas2 =  getCanvas(canvasId2);//getCanvas(canvasId1);

let context1 = canvas1.getContext("2d");
let context2 = canvas2.getContext("2d");

setCanvasWidthAndHeight(canvas1);
setCanvasWidthAndHeight(canvas2);

let width = innerWidth;
let height = innerHeight;

let length1 = pendulumLength(width, height, radius1);
let length2 = pendulumLength(width, height, radius2);

function getCanvas(canvasId){
    return document.getElementById(canvasId);
}

function setCanvasWidthAndHeight(canvas){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

function pendulumLength(width, height, radius){
    return Math.min(width,height) * radius;
}