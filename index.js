const fs = require('fs')
module.exports = class {
  constructor (name, folder) {
    this.data = []
    this.struct = {}
    this.events = {}

    if (name) {
      this.model = name
      if (folder) {
        this.persistence = true
        this.persistence_folder = './'
        this.load()
      }
    }
  }

  load () {
    try {
      const old_data = fs.readFileSync(`${this.persistence_folder}/${this.model}.json`, 'utf8')
      console.log(old_data)
      const load_data = JSON.parse(old_data)
      if (load_data.model !== this.model) {
        console.error('NO MODEL COMPATIBLE')
        process.exit(0)
      }
      this.data = load_data.data.map((x) => {
        x[Symbol('model')] = 'user'
        return x
      })
    } catch (error) {
      this.save()
    }
  }

  save () {
    if (this.model && this.persistence && this.persistence_folder) {
      const string_data = JSON.stringify({ model: this.model, lastUpdate: Date.now(), data: this.data })
      try {
        fs.writeFileSync(`${this.persistence_folder}/${this.model}.json`, string_data, 'utf8')
      } catch (error) {
        console.log(error)
      }
    }
  }
	
  add (item) {
    const newobj = {}
    if (this.model) newobj[Symbol('model')] = this.model
    const newitem = Object.assign(newobj, item)
    this.data.push(newitem)
    this.save()
  }
	
  struct (data) {
    this.struct = data
  }

  getStruct () {
    return this.struct
  }

  on (listener, func) {
    this.events[listener] = func
  }

  emit(listener, data) {
    this.events[listener](data)
  }

  get (id) {
    return this.data[id]
  }

  shift () {
    const ret = this.data.shift()
    this.save()
    return ret
  }

  pop () {
    const ret = this.data.shift()
    this.save()
    return ret
  }

  reverse () {
    return this.data.reverse()
  }

  size () {
    return this.data.length
  }

  remove (id) {
    this.data.splice(id,1)
    this.save()
  }

  clear () {
    this.data = []
    this.save()
  }

  getAll () {
    return this.data
  }

  last () {
    return this.data[this.data.length-1]
  }

  find (obj) {
    const key = Object.keys(obj)[0]
    return this.data.find((x) => {
      return x[key] === obj[key]
    })
  }

  filter (obj) {
    const key = Object.keys(obj)[0]
    return this.data.filter((x) => {
      return x[key] === obj[key]
    })
  }
}
