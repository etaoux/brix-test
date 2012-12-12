module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pathData:{
            pathData:{
                src:'components/'
            }
        }
    });

    //tasks
    grunt.loadTasks('tasks');

    // Default task.
    grunt.registerTask('default', 'pathData');
};
