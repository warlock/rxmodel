const RXmodel = require('../index.js')
const user = new RXmodel('user', './tmp')
user.add({ name: 'npm1' })
user.add({ name: 'nom2' })
user.add({ name: 'npm3' })
user.remove(0)
console.log(user.getAll())
