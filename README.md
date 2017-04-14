![travis build](https://travis-ci.org/benwilhelm/generator-capi.svg?branch=master)

![dependencies](https://david-dm.org/benwilhelm/generator-capi.svg)

# Composable API Generator

<!-- TOC depthFrom:2 depthTo:3 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
	- [Scaffolding your project](#scaffolding-your-project)
	- [Creating a REST Resource](#creating-a-rest-resource)
	- [Compiling and Serving Documentation](#compiling-and-serving-documentation)

<!-- /TOC -->

CAPI stands for _Composable API_. This is a Yeoman generator that creates a gulp-based authoring environment for [API Blueprint][apib] files, building a master blueprint file and HTML documentation composed of smaller, route- and model-specific files.

[apib]: https://apiblueprint.org/documentation/tutorial.html


## Prerequisites

[Node.js][nodejs], [Yeoman][yeoman], [Gulp][gulp]

[nodejs]: https://nodejs.org 
[yeoman]: http://yeoman.io 
[gulp]: http://gulpjs.com

## Installation

Assuming you have the above prerequisites, install the generator with:

    npm install -g generator-capi

## Usage

### Scaffolding your project

    yo capi 

This will build your generic project **in the current directory**, prompting you for name and description, port numbers for local servers, and values for your package.json file.

The initial project structure will be as follows:
```
[project root]
|- .gitignore
|- api-docs/
|   └- .gitkeep
|- api-src/
|   |- data-structures
|   |   └- _heading.apib 
|   |- routes/
|   |   └- .gitkeep
|   └- _heading.apib 
└- static-data/
    └- .gitkeep
```

#### `api-docs/`

The contents of this directory are ignored by Git. It is where the master API Blueprint file is generated, and from that, the html documentation is created and served.

#### `api-src/data-structures/`

In this directory you will put your model definitions, using APIB's [data structures format][data-structures]. The initial files can be created using the `yo capi:resource` command detailed below. That command will create a file for each model, but you can organize your files however you like.  Keep in mind that they are concatenated alphabetically, so nothing should be named in a way that it comes before `_heading.apib`.

[data-structures]: https://raw.githubusercontent.com/apiaryio/api-blueprint/master/examples/10.%20Data%20Structures.md

#### `api-src/routes/`

This is where you'll put your route definitions. Running `yo capi:resource` (outlined below) will create a file that defines CRUD routes for a single model, using a [Resource Group][resource-group]. Once the file is created, routes can be added, modified, or removed by hand.  Like the data-structures directory, you can organize these files however you like, but `_heading.apib` must be the first file alphabetically in the directory.

[resource-group]: https://raw.githubusercontent.com/apiaryio/api-blueprint/master/examples/04.%20Grouping%20Resources.md


#### `static-data/`

This is an artifact of an experimental feature. For now, these are not the droids you're looking for.

### Creating a REST Resource

    yo capi:resource

This command will prompt you for name and routing information for a new model. It will then create a new model definition file in the `api-src/data-structures` directory, and a new routes file in `api-src/routes`. See the [Scaffolding Your Project](#scaffolding-your-project) section above for details about these two directories. 

The prompts are as follows:

  * __Resource Name:__ The singular name of your model (eg. User)
  * __Route:__ The base route for the resource (eg. /users)
  * __ID Type:__ The primitive type of the model's ID field. 
  * __Description:__ A user-friendly description of the model.

### Compiling and Serving Documentation

    gulp

The default gulp task compiles fragment files into the master blueprint file (`api-docs/api-blueprint.apib`) and html file (`api-docs/index.html`), then serves the html documentation on localhost over the port specified during setup (defaults to http://localhost:8080). It also watches files for changes, upon which it will rebuild the documentation and reload the browser page displaying it.
