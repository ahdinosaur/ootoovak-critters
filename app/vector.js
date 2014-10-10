var Vector = function(x, y) {
  this.x = x || 0
  this.y = y || 0
}

Vector.prototype = {
  add: function(vector) {
    this.x += vector.x
    this.y += vector.y
  },
  getMagnitude: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  },
  getAngle: function () {
    return Math.atan2(this.y, this.x)
  },
}

Vector.fromAngle = function (angle, magnitude) {
  var x = magnitude * Math.cos(angle)
  var y = magnitude * Math.sin(angle)
  return new Vector(x, y)
}

module.exports = Vector
