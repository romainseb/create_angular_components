function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Created by romainseb on 06/10/2015.
 */
module.exports = function (grunt) {

    var createHtmlViewFile = function (path, componentName) {
        grunt.file.write(
            path + "/" + componentName + ".html",
            '<div id="' + componentName + '"></div>'
        );
    };

    var createHtmlDirectiveFile = function (path, componentName) {
        grunt.file.write(
            path + "/" + componentName + ".html",
            '<div class="' + componentName + '"></div>'
        );
    };

    var createCssFile = function (path, componentName, cssSuffix) {

        grunt.file.write(
            path + "/" + componentName + '.' + cssSuffix,
            ''
        );
    };

    var createControllerFile = function (path, componentName, moduleName, initServiceController) {
        var serviceController = initServiceController === true ? capitalizeFirstLetter(componentName) + "Service" : '';
        var componentNameCapitalized = capitalizeFirstLetter(componentName);
        var strToInsert = null;

        if (initServiceController === true) {
            strToInsert =
                "class " + componentNameCapitalized + "Controller {" +
                "\n\tconstructor(" + componentNameCapitalized + "Service) {" +
                "\n\t\tthis." + componentNameCapitalized + "Service = " + componentNameCapitalized + "Service;" +
                "\n\t}" +
                "\n}";
        }
        else {
            strToInsert =
                "class " + componentNameCapitalized + "Controller {" +
                "\n\tconstructor() {" +
                "\n\t}" +
                "\n}";
        }

        strToInsert += "\nangular.module('" + moduleName + "').controller('" + componentNameCapitalized + "Controller'," + componentNameCapitalized + "Controller);"

        grunt.file.write(
            path + "/" + componentName + "Controller.js", strToInsert)
        ;
    };

    var createServiceFile = function (path, componentName, moduleName) {
        grunt.file.write(
            path + "/" + componentName + "Service.js",
            "angular.module('" + moduleName + "').service('" + capitalizeFirstLetter(componentName) + "Service',\n\tfunction (){\n\t}\n);"
        );
    };

    var createDirectiveFile = function (path, componentName, moduleName) {
        grunt.file.write(
            path + "/" + componentName + "Directive.js",
            "angular.module('" + moduleName + "').directive('" +
            componentName + "',\n" +
            "\tfunction (){\n" +
            '\t\treturn {\n' +
            '\t\t\trestrict:"E",\n' +
            '\t\t\tbindToController : {},\n' +
            '\t\t\tcontroller:"' + capitalizeFirstLetter(componentName) + 'Controller",\n' +
            '\t\t\tcontrollerAs : "vm",\n' +
            '\t\t\ttemplateUrl : "' + path + "/" + componentName + '.html",\n' +
            '\t\t\tscope : true\n' +
            '\t\t};\n' +
            "\t}\n" +
            ");"
        )
        ;
    };

    var functions = {
        createHtmlViewFile: createHtmlViewFile,
        createHtmlDirectiveFile: createHtmlDirectiveFile,
        createCssFile: createCssFile,
        createControllerFile: createControllerFile,
        createServiceFile: createServiceFile,
        createDirectiveFile: createDirectiveFile
    };

    return functions;

};