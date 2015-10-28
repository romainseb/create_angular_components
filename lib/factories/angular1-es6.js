/**
 * Created by romainseb on 06/10/2015.
 */

var fs = require('fs');
var utils = require("../utils")();

module.exports = function (grunt) {


    var createHtmlViewFile = function (path, componentName) {
        var filePath = `${path}/${componentName}.html`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                `<div id="${componentName}"></div>`
            );
        }
    };

    var createHtmlDirectiveFile = function (path, componentName) {

        var filePath = `${path}/${componentName}.html`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                `<div class="${componentName}"></div>`
            );
        }
    };

    var createCssFile = function (path, componentName, cssSuffix) {
        var filePath = `${path}/${componentName}.${cssSuffix}`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                ''
            );
        }
    };

    var createControllerFile = function (path, componentName, moduleName, initServiceController) {

        var filePath = `${path}/${componentName}Controller.js`;
        var strToInsert = null;

        if (initServiceController === true) {
            strToInsert =
                `class ${utils.capitalizeFirstLetter(componentName)}Controller {\n` +
                `    constructor( ${utils.capitalizeFirstLetter(componentName)}Service ) {\n` +
                `        this.${utils.capitalizeFirstLetter(componentName)}Service = ${utils.capitalizeFirstLetter(componentName)}Service;\n` +
                `    }\n` +
                `}\n`;
        }
        else {
            strToInsert =
                `class ${utils.capitalizeFirstLetter(componentName)}Controller {\n` +
                `    constructor( ) {\n` +
                `    }\n` +
                `}\n`;
        }

        strToInsert += `\nangular.module( "${moduleName}" ).controller( "${utils.capitalizeFirstLetter(componentName)}Controller" , ${utils.capitalizeFirstLetter(componentName)}Controller);`

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                strToInsert
            );
        }
    };

    var createServiceFile = function (path, componentName, moduleName) {

        var filePath = `${path}/${componentName}Service.js`;

        var strToInsert =
            `class ${utils.capitalizeFirstLetter(componentName)}Service {\n` +
            `    constructor( ) {\n` +
            `    }\n` +
            `}\n`;

        strToInsert += `\nangular.module( "${moduleName}" ).service( "${utils.capitalizeFirstLetter(componentName)}Service" , ${utils.capitalizeFirstLetter(componentName)}Service);`

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                strToInsert
            );
        }


    };

    var createDirectiveFile = function (path, componentName, moduleName, pwd) {

        var filePath = `${path}/${componentName}Directive.js`;
        var pathHtmlFile = path.split(pwd)[1] + componentName + ".html";

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                `angular.module('${moduleName}').directive('${componentName}',\n` +
                `    function (){\n` +
                `        return {\n` +
                `            restrict:"E",\n` +
                `            bindToController : {},\n` +
                `            controller:"${utils.capitalizeFirstLetter(componentName)}Controller",\n` +
                `            controllerAs : "vm",\n` +
                `            templateUrl : "${pathHtmlFile}",\n` +
                `            scope : true\n` +
                `        };\n` +
                `    }\n` +
                `);`
            )
            ;
        }
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