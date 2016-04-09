# Create Angular Components

> A little tool to create angularJS  components

## Getting Started

```shell
npm i -g create_angular_components
```

```js
grunt.loadNpmTasks('grunt-sro-create-angular-components');
```

## The "sro_create_angular_components" task

### Overview
In your project's Gruntfile, add a section named `sro_create_angular_components` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sro_create_angular_components: {
    moduleName: {
      views:[
        //list of paths for view
       ],
       directives:[
       //list of paths for components
       }
    }
  },
});
```

The name is the last part of the path.

This will create for views this files :
- {path}/{name}Controller.js
- {path}/{name}Service.js
- {path}/{name}.css
- {path}/{name}.html

This will create for views this files :
- {path}/{name}Controller.js
- {path}/{name}Directive.js
- {path}/{name}Service.js
- {path}/{name}.css
- {path}/{name}.html

### Usage Examples

This will create the following content :

```js
app/
 | views/
 |  | home/
 |  |  | home.html
 |  |  | home.css
 |  |  | homeController.js
 |  |  | homeService.js
 |  |  | components/
 |  |  |  | siteHeader/
 |  |  |  |  | siteHeader.css
 |  |  |  |  | siteHeader.html
 |  |  |  |  | siteHeaderController.js
 |  |  |  |  | siteHeaderDirective.js
 |  |  |  |  | siteHeaderService.js
 ```

```js
grunt.initConfig({
  sro_create_angular_components: {
    website: {
      views: [
        "app/views/home"
      ],
      directives: [
        "app/views/home/components/siteHeader"
      ]
    }
  },
});
```

### Options

There is an option called "initServiceController" that you can set to false to disable the injection in the controller of the related service.
There is an option called "cssSuffix" that you can set to modify the extension of the style files

```js
grunt.initConfig({
  sro_create_angular_components: {
    moduleName: {
      views:[
        //list of paths for view
       ],
       directives:[
       //list of paths for components
       },
       options: {
          initServiceController: true,
          cssSuffix: 'less' //scss
      }
    }
  },
});
```
