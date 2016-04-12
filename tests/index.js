var fileManager = require('../fileManager')

fileManager.addFiles([{kalle: 'janne'}])
console.log( fileManager.getFiles() )
console.log( fileManager.getNextFile() )
console.log( fileManager.getFiles() )
