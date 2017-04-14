var Generator = require("yeoman-generator");

module.exports = class extends Generator {

  _copy(src, dest) {
    dest = dest || src;
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    )
  }
  
  _copyTpl(src, dest) {
    dest = dest || src;
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.templateVars
    )
  }
  
  _touch(file) {
    this.fs.write( this.destinationPath(file), "" )
  }
  
}
