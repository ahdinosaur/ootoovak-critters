var Vector   = require('./vector')
var Particle = require('./particle')

var Emitter = function(position, velocity, spread) {
  this.position  = position
  this.velocity  = velocity
  this.spread    = spread || (Math.PI / 16)
  this.drawColor = '#099'
}

Emitter.prototype = {
  emitParticle: function() {
    var angle     = this.randomAngle()
    var magnitude = this.velocity.getMagnitude()
    var position  = new Vector(this.position.x, this.position.y)

    var velocity = Vector.fromAngle(angle, magnitude)

    return new Particle(position, velocity)
  },
  randomAngle: function() {
    var velocityAngle       = this.velocity.getAngle()
    var randomAngleInSpread = this.spread - (Math.random() * this.spread * 2)
    return velocityAngle + randomAngleInSpread
  },
}

module.exports = Emitter
