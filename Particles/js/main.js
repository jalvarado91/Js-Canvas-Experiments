var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var particleNum = 2000;
var emissionRate = 4;
var emitters = [ new Emitter(new Vector(canvas.width/2,canvas.height/2), new Vector(0, 1), Math.PI/12 ) ];


var particleSize = 2;
var particles = [];

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
  ctx.fillStyle = 'rgb(0, 0, 255)';
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
  var position = new Vector(this.position.x, this.position.y)
  var magnitute = this.velocity.getMagnitude();
  var angle = this.velocity.getAngle() + this.spread - (Math.random()*this.spread*2);

  var velocity = Vector.fromAngle(angle, magnitute)

  return new Particle(position, velocity);
};



/* Updating Functions
 ********************/

function addParticles () {
  if (particles.length > particleNum) {return};

  for (var i = 0; i < emitters.length; i++) {

    for (var j = 0; j < emissionRate; j++) {
      particles.push(emitters[i].emitParticle());
    };

  };
}

function plotParticles () {
  for (var i = 0; i < particles.length; i++) {
    particles[i].move();
  }
}


/* Drawing Functions
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
  addParticles();
  plotParticles();
}

function draw() {
  drawParticles();
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();