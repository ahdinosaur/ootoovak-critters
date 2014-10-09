function World() {
  this.canvas = document.querySelector('#world')
  this.ctx    = this.canvas.getContext('2d')
}

World.prototype.start = function() {
  this.canvas.width  = window.innerWidth
  this.canvas.height = window.innerHeight
}

document.addEventListener('DOMContentLoaded', function(){
  var world = new World()
  world.start()
});
