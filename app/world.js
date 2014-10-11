var Vector  = require('./vector')
var Emitter = require('./emitter')
var Field   = require('./field')

var World = function() {
  this.canvas       = document.querySelector('#world')
  this.ctx          = this.canvas.getContext('2d')
  this.particles    = []
  this.emitters     = []
  this.fields       = []
  this.maxParticles = 25000
  this.emissionRate = 10
  this.particleSize = 1
}

World.prototype = {
  start: function() {
    this.initialize()
    this.cycle()
  },
  initialize: function() {
    this.canvas.width  = window.innerWidth
    this.canvas.height = window.innerHeight
    this.emitters.push(this.createAnEmitter())
    this.fields.push(this.createAField())
  },
  cycle: function() {
    this.clear()
    this.update()
    this.draw()
    this.queue()
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  queue: function() {
    window.requestAnimationFrame(this.cycle.bind(this))
  },
  update: function() {
    this.addNewParticles()
    this.plotParticles(this.canvas.width, this.canvas.height)
  },
  draw: function() {
    this.drawParticles()
  },
  createAnEmitter: function() {
    var position = new Vector(300, 500)
    var velocity = Vector.fromAngle(0, 2)
    return new Emitter(position, velocity)
  },
  createAField: function() {
    var position = new Vector(500, 500)
    return new Field(position, -140)
  },
  addNewParticles: function() {
    if (this.particles.length > this.maxParticles) return

    for (var i = 0; i < this.emitters.length; i++) {
      for (var j = 0; j < this.emissionRate; j++) {
        var particle = this.emitters[i].emitParticle()
        this.particles.push(particle)
      }
    }
  },
  plotParticles: function(boundsX, boundsY) {
    var currentParticles = []

    for (var i = 0; i < this.particles.length; i++) {
      var particle = this.particles[i]
      var pos      = particle.position

      if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue

      particle.move()
      currentParticles.push(particle)
    }

    this.particles = currentParticles
  },
  drawParticles: function() {
    this.ctx.fillStyle = 'rgb(255,255,255)'

    for (var i = 0; i < this.particles.length; i++) {
      var position = this.particles[i].position

      this.ctx.fillRect(position.x, position.y, this.particleSize, this.particleSize)
    }
  },
}

module.exports = World
