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
  this.objectSize   = 3
}

World.prototype = {
  start: function() {
    this.initialize()
    this.cycle()
  },
  initialize: function() {
    this.canvas.width  = window.innerWidth
    this.canvas.height = window.innerHeight
    this.emitters = [
      this.createAnEmitter(300,   525,  0,  2),
      this.createAnEmitter(1100,  525,  0,  -2),
    ]
    this.fields = [
      this.createAField(700,  325,  2000),
      this.createAField(700,  525,  -200),
      this.createAField(700,  725,  2000),
    ]
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
    this.fields.forEach(this.drawCircle.bind(this))
    this.emitters.forEach(this.drawCircle.bind(this))
  },
  createAnEmitter: function(x, y, fromAngle, toAngle) {
    var position = new Vector(x, y)
    var velocity = Vector.fromAngle(fromAngle, toAngle)
    return new Emitter(position, velocity)
  },
  createAField: function(x, y, mass) {
    var position = new Vector(x, y)
    return new Field(position, mass)
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

      particle.submitToFields(this.fields)

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
  drawCircle: function(object) {
    this.ctx.fillStyle = object.drawColor
    this.ctx.beginPath()
    var x    = object.position.x
    var y    = object.position.y
    var size = this.objectSize
    this.ctx.arc(x, y, size, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fill()
  },
}

module.exports = World
