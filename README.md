RxModel
===
> Lightweigth Data model with persistence

## INSTALL/DOWNLOAD
```sh
npm install rxmodel
```


### NPM URL
```
http://npmjs.com/package/rxmodel
```

### GIT URL
```
https://github.com/warlock/rxmodel
```

## Example:
```js
const RXmodel = require('rxmodel')
const user = new RXmodel('user', './data_folder/')
user.add({ name: 'name4' })
user.add({ name: 'name5' })
user.add({ name: 'name6' })
console.log(user.size())
user.remove(2)
console.log(user.getAll())
console.log(user.size())
```

```sh
6
[ { name: 'name1', [Symbol(model)]: 'user' },
  { name: 'name3', [Symbol(model)]: 'user' },
  { name: 'name4', [Symbol(model)]: 'user' },
  { name: 'name5', [Symbol(model)]: 'user' },
  { name: 'name6', [Symbol(model)]: 'user' } ]
5
```


## License
The MIT License (MIT)
Copyright (c) 2015 Josep Subils (js@js.gl)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

