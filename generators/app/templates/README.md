# <%= projectTitle %>

<%= projectDescription %>

This API documentation is generated using [Yeoman][yeoman] and the [CAPI Genarator][capi]. It uses the [API Blueprint][apib] (APIB) specification to generate HTML documentation.

[yeoman]: http://yeoman.io 
[capi]:   https://www.npmjs.com/package/generator-capi
[apib]:   https://apiblueprint.org/


## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org)
* [Gulp](http://gulpjs.com)

**Optional, but recommended**

* [Yeoman][yeoman]
* [CAPI Generator][capi]


### Installation 

Assuming above prerequisites are met, simply run

    $ npm install 

This project is composed of many fragments of documentation files in the `api-src` directory, which are concatenated into one master blueprint file in the `api-docs` directory. See the [CAPI documentation][capi] for detailed installation instructions. If you're reading this, you or someone else has already scaffolded the project by running `yo capi`, so we will pick up with adding resources to the project. 

### Adding a Resource

This assumes that you have installed the optional prerequisites listed above, [Yeoman][yeoman] and the [CAPI Generator][capi]. To add a new resource (model) to your API, run

    yo capi:resource 
    
This will add a new model to your API and scaffold CRUD routes for it. It will prompt you for the following information:

* __Resource Name:__ The singular name of your model (eg. User)
* __Route:__ The base route for the resource (eg. /users)
* __ID Type:__ The primitive type of the model's ID field. 
* __Description:__ A user-friendly description of the model.

Then it will prompt you to add properties to your model, asking you the following repeatedly until you tell it to stop:

* __Property Name:__ The name of the property as it will appear in your returned model
* __Property Type:__ The primitive type of the property's value
* __Property Description:__ A short description of the property
* __Required?:__ Whether this property is required
* __Sample Value (optional):__ A sample value for documentation

This will put the model definition file in `api-src/data-structures/<resouce-name>.apib` and the route definitions in `api-src/routes/<resource-name>.apib`. See the APIB documentation for specifics on formatting [data structures][data-structures] and [resource groups][resource-group] (routes).

[data-structures]: https://raw.githubusercontent.com/apiaryio/api-blueprint/master/examples/10.%20Data%20Structures.md

[resource-group]: https://raw.githubusercontent.com/apiaryio/api-blueprint/master/examples/04.%20Grouping%20Resources.md

### Gulp Tasks 

You shouldn't generally need to run individual tasks. By running the default task (`gulp`), you will run `build:apib`, `build:html`, and `serve:docs`, followed by `watch`, which will re-run each of those tasks as necessary based on file changes.

#### Build Master APIB File: `gulp build:apib`

This task compiles all the fragment apib files into one master apib file at `api-docs/api-blueprint.apib`.

#### Build HTML Documentation: `gulp build:html`

This task reads the file at `api-docs/api-blueprint.apib` and generates nicely styled HTML documentation at `api-docs/index.html`. It will first run `build:apib`, so you can be assured that the source file is up to date before generating. 

#### Serve documentation locally: `gulp serve:docs` 

This starts a local http server out of the `api-docs` directory at http://localhost:<%= docPort %>

#### Development watch task: `gulp watch`

* Watches for changes in the `api-src` directory and rebuilds the master blueprint file.  
* Watches for changes in the master blueprint file and rebuilds the html documentation
* Watches for changes in the html documentation and reloads the browser
