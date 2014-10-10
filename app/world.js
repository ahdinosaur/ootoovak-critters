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
    console.info("clear")
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  queue: function() {
    console.info("queue")
    window.requestAnimationFrame(this.cycle.bind(this));
  },
  update: function() {
    console.info("update")
    // stub
  },
  draw: function() {
    console.info("draw")
    // stub
  },
}

module.exports = World
