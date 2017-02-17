'use strict';

let assert  = require("yeoman-assert");
let fs      = require('fs');
let helpers = require("yeoman-test");
let path    = require("path");


describe("Resource Subgenerator (yo capi:resource)", function(){
  
  describe("Generic setup", function(){
    let suite = this;
    
    beforeAll(function(done){
      helpers.run(path.resolve(__dirname, '../generators/resource'))
      .withPrompts({
        resourceName: 'TestResource',
        route: '/testresources',
        idType: 'number',
        resourceDescription: 'This is a test resource'
      })
      .then(function(dir){
        suite.dir = dir;
        done();
      })
      .catch(done)

    })
    
    it("should create data structure file", function(){
      let file = `${suite.dir}/api-src/data-structures/test-resource.apib`;
      assert.file(file);
      assert.fileContent(file, "### TestResource (object)");
      assert.fileContent(file, "+ id: `1` (number, required)");
    })

    it("should create routes file with CRUD endpoints", function(){
      let file = `${suite.dir}/api-src/routes/test-resource.apib`;
      assert.file(file);
      assert.fileContent(file, "# Group TestResources");
      assert.fileContent(file, "This is a test resource");
      assert.fileContent(file, '## TestResources Collection [/testresources]');
      assert.fileContent(file, '### Get all TestResources [GET]');
      assert.fileContent(file, '### Create a new TestResource [POST]');
      assert.fileContent(file, '## Single TestResource [/testresources/{testresource_id}]');
      assert.fileContent(file, '### Get a TestResource [GET]');
      assert.fileContent(file, '### Update a TestResource [PUT]');
      assert.fileContent(file, '### Delete a TestResource [DELETE]');
    })

  })
})
