var generators = require("yeoman-generator");

module.exports = generators.Base.extend({

  _copy: function(src, dest) {
    dest = dest || src;
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    )
  },
  
  _copyTpl: function(src, dest) {
    dest = dest || src;
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.templateVars
    )
  },
  
  _touch: function(file) {
    this.fs.write( this.destinationPath(file), "" )
  }
  
})
