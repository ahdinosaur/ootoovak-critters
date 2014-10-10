var World = function() {
  this.canvas = document.querySelector('#world')
  this.ctx    = this.canvas.getContext('2d')
}

World.prototype = {
  start: function() {
    this.initialize()
    this.cycle()
  },
  initialize: function() {
    this.canvas.width  = window.innerWidth
    this.canvas.height = window.innerHeight
  },
  cycle: function() {
    this.clear()
    this.update()
    this.draw()
    this.queue()
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  queue: function() {
    window.requestAnimationFrame(this.cycle.bind(this));
  },
  update: function() {
    // stub
  },
  draw: function() {
    // stub
  },
}

module.exports = World
