var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
};

Vector.prototype.getMagnitude = function() {
  return( Math.sqrt((this.x*this.x) + (this.y*this.y)) );
};

Vector.prototype.getAngle = function() {
  return Math.atan2(this.x, this.y);
};

Vector.fromAngle = function(angle, magnitute) {
  return new Vector(magnitute*Math.cos(angle), magnitute*Math.sin(angle));
}

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