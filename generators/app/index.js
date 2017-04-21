'use strict';

var Base = require('./generator-base')
var minNodeVersion = 6.0;

module.exports = class extends Base {
  
  initializing() {
    if (parseFloat(process.versions.node) < minNodeVersion) {
      this.log('');
      this.log('******************************************************************************');
      this.log(`*  Using the CAPI generator with Node versions before ${minNodeVersion} is not recommended.  *`);
      this.log(`*          We recommend upgrading to Node ${minNodeVersion} or greater (try nvm!)            *`);
      this.log('******************************************************************************');
      this.log('');
    }
    this.composeWith(require.resolve('generator-npm-init/app'))
  }
  
  prompting() {
    return this.prompt([{
      type : 'input',
      name : 'projectTitle',
      message : 'Project Title',
      default : 'My Project'
    }, {
      type: 'input',
      name: 'projectDescription',
      message : 'Project Description',
      default : '...'
    }, {
      type: 'input',
      name: 'docPort',
      message: 'Port to serve documentation site locally',
      default: 8080
    }, {
      type: 'input',
      name: 'serverPort',
      message: 'Port to serve mock API',
      default: 8000
    }]).then(function(answers){
      this.templateVars = answers
      this.log("")
      this.log("*** Initializing package.json ***")
    }.bind(this))
  }
  
  writing() {
    this._touch( 'api-docs/.gitkeep' );
    this._touch( 'api-src/routes/.gitkeep' );
    this._copyTpl('_gitignore', '.gitignore');
    this._copyTpl('_gulpfile.js', 'gulpfile.js');
    this._copyTpl('api-src/_heading.apib');
    this._copy('api-src/data-structures/_heading.apib');
    this._copy('api-src/data-structures/errors.apib');
    this._copyTpl('README.md');
  }

  install() {
    this.npmInstall([
      'aglio',
      'gulp',
      'gulp-aglio',
      'gulp-concat',
      'gulp-connect',
      'gulp-rename'
    ], { "save": true })
  }
}
