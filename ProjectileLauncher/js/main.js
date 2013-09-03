"use strict";

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var midX = canvas.width/2;
var midY = canvas.height/2;

var emissionRate = 10;
var particleSize = 1.7;


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
  return Math.atan2(this.y, this.x);
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
  this.color = 'rgb(0, 0, 255)';
}
Particle.prototype.calculateForces = function(fields) {
  var totalAccelerationX = 0;
  var totalAccelerationY = 0;

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    
    var diff_x = field.position.x - this.position.x;
    var diff_y = field.position.y - this.position.y;

    var force = bigG*field.mass/Math.pow( diff_x*diff_x + diff_y*diff_y , 1.5); 

    totalAccelerationX += diff_x*force;
    totalAccelerationY += diff_y*force;
  };

  this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);
};

Particle.prototype.move = function() {
  //Add current acceleration to current velocity
  this.velocity.add(this.acceleration);

  //Add current velocity to current position
  this.position.add(this.velocity);
};

Particle.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.position.x, this.position.y, particleSize, particleSize);
};


/* Emitter Class
 ********************/
function Emitter (point, velocity, spread) {
  this.position = point; // Vector
  this.velocity = velocity; // Vector
  this.spread = spread || Math.PI / 32;
  this.drawColor = "#999";
}

Emitter.prototype.emitParticle = function() {
  var angle = this.velocity.getAngle() + this.spread - (Math.random()*this.spread*2);

  var magnitute = this.velocity.getMagnitude();
  var position = new Vector(this.position.x, this.position.y)

  var velocity = Vector.fromAngle(angle, magnitute)

  return new Particle(position, velocity);
};

/* Field Class
 ********************/
function Field(point, mass) {
  this.position = point;
  this.setMass(mass);
}

Field.prototype.setMass = function(mass) {
  this.mass = mass || 100;
  this.drawColor = mass < 0 ? "#f00" : "#0f0";
}


/* Updating Functions
 ********************/



/* Drawing Functions
 ********************/


/* Variables that use classes defined 
 * above placed here due to hoisting 
 *************************************/



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
  // plotParticles(canvas.width, canvas.height);
}

function draw() {

}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();