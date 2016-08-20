var Model = require('../index.js')

var clients = new Model();

clients.on('reverse', function (b) {
  console.log('aaaa ' + JSON.stringify(b))
})

clients.on('push', function (b) {
  console.log('pushing ' + JSON.stringify(b))
})

clients.push({ nom : 'a', edad : 5 })

clients.push({ nom : 'a2', edad : 5 })

clients.push({ nom : 'a3', edad : 5 })

clients.reverse()
