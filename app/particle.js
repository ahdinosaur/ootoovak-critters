var Vector = require('./vector')

var Particle = function(position, velocity, acceleration) {
  this.position     = position     || new Vector(0, 0)
  this.velocity     = velocity     || new Vector(0, 0)
  this.acceleration = acceleration || new Vector(0, 0)
}

Particle.prototype = {
  move: function () {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
  },
  submitToFields: function (fields) {
    var totalAccelerationX = 0
    var totalAccelerationY = 0

    for (var i = 0; i < fields.length; i++) {
      var field   = fields[i]
      var vectorX = field.position.x - this.position.x
      var vectorY = field.position.y - this.position.y

      var vectorMath = vectorX * vectorX + vectorY * vectorY
      var force      = field.mass / Math.pow(vectorMath, 1.5)

      totalAccelerationX += vectorX * force
      totalAccelerationY += vectorY * force
    }

    this.acceleration = new Vector(totalAccelerationX, totalAccelerationY)
  },
}

module.exports = Particle
