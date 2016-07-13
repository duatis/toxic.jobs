/**
 * Created by duatis on 13/07/16.
 */
module.exports = function(grunt) {

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false,
                    clearRequireCache: false
                },
                src: ['test/*.test.njs']
            }
        }
    });

    grunt.registerTask('default', 'mochaTest');

};