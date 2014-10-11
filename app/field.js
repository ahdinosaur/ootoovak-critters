var Field = function(position, mass) {
  this.position = position
  this.setMass(mass)
}

Field.prototype = {
  setMass: function(mass) {
    this.mass      = mass || 100
    this.drawColor = mass < 0 ? "#f00" : "#0f0"
  }
}

module.exports = Field
