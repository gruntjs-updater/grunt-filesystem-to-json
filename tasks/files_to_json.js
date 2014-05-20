/*
 * grunt-files-to-json
 * Please answer the follow
 *
 * Copyright (c) 2014 Allan Hortle
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var fs = require("fs"),
        path = require("path");


    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    

    grunt.registerMultiTask('files_to_json', 'Turns files into json data', function(a, b) {
        var data = {};

        function setObject(name, value, context) {
            var parts = name.split("."), 
            p = parts.pop();
            for(var i=0, j; context && (j=parts[i]); i++){
                context = (j in context ? context[j] : context[j]={});
            }
            return context && p ? (context[p]=value) : undefined; // Object
        }

        this.files.forEach(function(file) {
            var contents = file.src.filter(function(filepath) {
                if (grunt.file.isFile(filepath)) {
                    return true;
                }
                // console.log(jsoner(depth));                
            }).map(function(filepath) {

                var index = filepath.lastIndexOf("/");
                var fileName = filepath.substr(index + 1);


                var path = filepath.split('/').join('.');
                path = path.substr(0, path.lastIndexOf("."))
                console.log(path);
                setObject(path, fileName, data);
            });
            console.log(JSON.stringify(data))
            grunt.file.write(file.dest, JSON.stringify(data));
            
        });


    });

};
