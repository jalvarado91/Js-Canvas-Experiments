var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var particleSize = 1;
var particles = [ new Particle( new Vector(canvas.height/2, canvas.height/2), new Vector(1, 1), new Vector(0,.5) ) ];

/* Vector Class
 ********************/

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

/* Particle Class
 ********************/

function Particle (point, velocity, acceleration) {
  this.position = point || new Vector(0,0);
  this.velocity = velocity || new Vector(0,0);
  this.acceleration = acceleration || new Vector(0,0);
}

Particle.prototype.move = function() {
  //Add current acceleration to current velocity
  this.velocity.add(this.acceleration);

  //Add current velocity to current position
  this.position.add(this.velocity);
};

Particle.prototype.draw = function() {
  ctx.fillStyle = "rgb(0, 0, 255)";
  ctx.fillRect(this.position.x, this.position.y, particleSize, particleSize)
};

/* Updating Calls
 ********************/
function plotParticles () {
  for (var i = 0; i < particles.length; i++) {
    particles[i].move();
  }
}


/* Drawing Calls
 ********************/
function drawParticles () {
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw();
  };
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
  plotParticles();
}

function draw() {
  drawParticles();
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();