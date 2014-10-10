var Vector = require('./vector')

var Particle = function(position, velocity, acceleration) {
  this.position     = position     || new Vector(0, 0)
  this.velocity     = velocity     || new Vector(0, 0)
  this.acceleration = acceleration || new Vector(0, 0)
}

Particle.prototype = {
  move = function () {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
  },
}

module.exports = Particle
