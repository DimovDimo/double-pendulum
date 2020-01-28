let canvasContext1 = get2dCanvasContext("canvas-1");
let canvasContext2 = get2dCanvasContext("canvas-2");

function get2dCanvasContext(canvasId){
    let canvas = document.getElementById(canvasId);
    return canvas.getContext("2d");
}