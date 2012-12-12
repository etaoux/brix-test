/*
 * grunt-brixjs
 * https://github.com/etaoux/brix
 *
 * Copyright (c) 2012 左莫
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    // Grunt utilities.
    var task = grunt.task;
    var file = grunt.file;
    var utils = grunt.utils;
    var log = grunt.log;
    var verbose = grunt.verbose;
    var fail = grunt.fail;
    var option = grunt.option;
    var config = grunt.config;
    var template = grunt.template;

    // external dependencies
    var fs = require('fs');
    var path = require('path');

    // ==========================================================================
    // TASKS
    // ==========================================================================
    grunt.registerMultiTask('pathData', 'Compile pathData.', function() {
        var src = this.file.src;
        var arr = [];
        fs.readdirSync(src).forEach(function(f){
            arr.push(f);
        });
        file.write('data.js', 'var list='+JSON.stringify(arr));
    });
};