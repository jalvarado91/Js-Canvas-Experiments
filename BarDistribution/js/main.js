"use strict";

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var midX = canvas.width/2;
var midY = canvas.height/2;


/* Loop Sequence */ 
function loop() {
  clear();
  update();
  draw();
  queue();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {

}

function draw() {

}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();