'use strict';

let assert  = require("yeoman-assert");
let fs      = require('fs');
let helpers = require("yeoman-test");
let path    = require("path");

describe("Main Generator (yo capi)", function(){
  
  describe("Generic setup", function(){
    let suite = this; 
    
    beforeAll(function(done){
      return helpers.run(path.resolve(__dirname, '../generators/app'))
      .withGenerators(deps)
      .withPrompts({
        projectTitle: "Test Project",
        projectDescription: "This is a test",
        docPort: 4000,
        serverPort: 5000
      })
      .then(function(dir){
        suite.dir = dir;
        done();
      })
      .catch(done)
    })
    
    it("should put project title and description in api-src/_heading.apib", function(){
      let file = `${suite.dir}/api-src/_heading.apib`;
      assert.file(file);
      assert.fileContent(file, "# Test Project");
      assert.fileContent(file, "This is a test");
    })
    
    it("should create gulp constants with appropriate ports", function(){
      let file = `${suite.dir}/gulpfile.js`;
      assert.file(file);
      assert.fileContent(file, "const DOC_PORT = 4000");
      assert.fileContent(file, "const SERVER_PORT = 5000");
    })
    
    it("should create data-structures heading", function(){
      let file = `${suite.dir}/api-src/data-structures/_heading.apib`;
      assert.file(file);
      assert.fileContent(file, "## Data Structures");
    })

    it("should create Error data structures", function(){
      let file = `${suite.dir}/api-src/data-structures/errors.apib`;
      assert.file(file);
      assert.fileContent(file, "### Error (object)");
      assert.fileContent(file, "### ErrorNotFound (Error)");
      assert.fileContent(file, "### ErrorUnauthorized (Error)");
      assert.fileContent(file, "### ErrorForbidden (Error)");
      assert.fileContent(file, "### ErrorBadRequest (Error)");
    })
    
    it("should create api-src/routes/.gitkeep", function(){
      let file = `${suite.dir}/api-src/routes/.gitkeep`;
      assert.file(file);
    })

    it("should create api-docs/.gitkeep", function(){
      let file = `${suite.dir}/api-docs/.gitkeep`;
      assert.file(file);
    })
    
    it("should create README.md", function(){
      let file = `${suite.dir}/README.md`;
      assert.file(file);
      assert.fileContent(file, "# Test Project")
      assert.fileContent(file, [
        "This starts a local http server out of the `api-docs`",
        "directory at http://localhost:4000"].join(' '))
    })
    
  })
})
