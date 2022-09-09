const fs = require('fs')

module.exports = function (grunt) {
	// Load the plugins
	require('load-grunt-tasks')(grunt)
	// Project configuration.
	grunt.initConfig({
		exec: {
			lint: { cmd: 'npx eslint src ' },
			tsc: { cmd: 'npx tsc ' },
			release: { cmd: './release.sh' },
			to_develop: { cmd: './to_develop.sh' }
		},
		clean: {
			build: ['build'],
			dist: ['dist']
		},
		copy: {
			build: { expand: true, cwd: 'build/lib/', src: '**', dest: 'dist/' },
			readme: { expand: true, src: './README.md', dest: 'dist/' },
			license: { expand: true, src: './LICENSE', dest: 'dist/' }
		}
	})

	grunt.registerTask('create-package', 'create package.json for dist', function () {
		const data = require('./package.json')
		delete data.devDependencies
		delete data.scripts
		delete data.private
		data.main = 'index.js'
		data.types = 'index.d.ts'
		fs.writeFileSync('dist/package.json', JSON.stringify(data, null, 2), 'utf8')
	})

	grunt.registerTask('lint', ['exec:lint'])
	grunt.registerTask('build', ['clean:build', 'exec:tsc'])
	grunt.registerTask('dist', ['clean:dist', 'build', 'copy:build', 'copy:readme', 'copy:license', 'create-package'])
	grunt.registerTask('release', ['lint', 'build', 'dist', 'exec:release'])
	grunt.registerTask('to_develop', ['lint', 'build', 'dist', 'exec:to_develop'])
	grunt.registerTask('default', [])
}
