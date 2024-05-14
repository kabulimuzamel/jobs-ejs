const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

fs.readFile('packages.txt', 'utf8', async (err, data) => {
	if (err) {
		console.error('Error reading file:', err)
		return
	}

	const packages = data.trim().split('\n')

	for (const pkg of packages) {
		try {
			const { stdout, stderr } = await exec(`npm install --save ${pkg}`)
			console.log(`${pkg} installed successfully`)
		} catch (error) {
			console.error(`Error installing ${pkg}:`, error)
		}
	}
})
