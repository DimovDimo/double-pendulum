const canvasId1 = "canvas-1";
const canvasId2 = "canvas-2";
const gravity = 1;

let canvas1 =  getCanvas(canvasId1);
let canvas2 =  getCanvas(canvasId2);

let context1 = canvas1.getContext("2d");
let context2 = canvas2.getContext("2d");

setCanvasWidthAndHeight(canvas1);
setCanvasWidthAndHeight(canvas2);

let width = innerWidth;
let height = innerHeight;

function getCanvas(canvasId){
    return document.getElementById(canvasId);
}

function get2dCanvasContext(canvas){
    return canvas.getContext("2d");
}

function setCanvasWidthAndHeight(canvas){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}