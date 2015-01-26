module.exports = function(grunt) {

	var config = {

	}

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		watch: {

			express: {
				files:  [
					  'app.js'
					, 'bin/**/*.js'
					, 'mocks/**/*.hbs'
					, 'app/**/*'
				],
				tasks:  [ 'express:dev' ],
				options: {
					nospawn: true // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
				}
			}
		},
		express: {
			options: {
				// Override defaults here
			},
			dev: {
				options: {
				script: 'dev-start.js'
			}
			},
			prod: {
				options: {
				script: 'path/to/prod/server.js',
				node_env: 'production'
			}
			},
			test: {
				options: {
					script: 'path/to/test/server.js'
				}
			}
		}
	});

	//grunt.renameTask('regarde', 'watch');

	// Default task(s).
	grunt.registerTask('default', ['yesman']);

	grunt.registerTask('yesman', [
		'express:dev',
		'watch'
	]);

};