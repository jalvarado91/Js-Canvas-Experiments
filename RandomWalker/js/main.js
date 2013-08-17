var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var STEPSIZE = 1.6;
var particle_style = "circle" // circle || square(default)

var MID_HEIGHT = canvas.height/2;
                        //  x,   y,         color  , size
var walkers = [new Walker(200, MID_HEIGHT, '#CE39B5', 1.5),
               new Walker(300, MID_HEIGHT, '#E23E52', 1.5),
               new Walker(400, MID_HEIGHT, '#00A6A3', 1.5),
               new Walker(500, MID_HEIGHT, '#EFE242', 1.5),
               new Walker(600, MID_HEIGHT, '#EF9D42', 1.5),
               new Walker(700, MID_HEIGHT, '#0056A6', 1.5),
               new Walker(800, MID_HEIGHT, '#EF6D42', 1.5)];

function Walker(x, y, color, size) {
  this.x = x || canvas.width/2;
  this.y = y || canvas.height/2;
  this.color = color || '#1f08cf'; // HEX value
  this.size = size || 1;
}

Walker.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.size, this.size)
}
Walker.prototype.drawCircle = function() {
  var radius = this.size; 
  ctx.beginPath();
  ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
}

Walker.prototype.move = function() {
  var stepx = Math.floor((Math.random()*3) - 1);
  var stepy = Math.floor((Math.random()*3) - 1);
  
  this.x += stepx*STEPSIZE;
  this.y += stepy*STEPSIZE;
}

function drawWalkers() {
  for (var i = 0; i < walkers.length; i++) {
    if(particle_style == "circle") {
      walkers[i].drawCircle();
    }
    else
      walkers[i].draw();
  }
}

function moveWalkers() {
  for (var i = 0; i < walkers.length; i++) {
    walkers[i].move();
  }
}

function loop() {
  //clear();
  update();
  draw();
  queue();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  moveWalkers();
}

function draw() {
  drawWalkers();
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();