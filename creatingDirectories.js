const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

fs.readFile('directories.txt', 'utf8', async (err, data) => {
	if (err) {
		console.error('Error reading file:', err)
		return
	}

	const directories = data.trim().split('\n')

	for (const dir of directories) {
		try {
			const { stdout, stderr } = await exec(`mkdir ${dir}`)
			console.log(`${dir} created successfully`)
		} catch (error) {
			console.error(`Error creating ${dir}:`, error)
		}
	}
})
