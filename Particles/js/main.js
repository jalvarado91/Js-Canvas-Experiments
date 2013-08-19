var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


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