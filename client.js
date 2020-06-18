const http = require('http');
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/orders',
  method: 'get'
}

http.get(options, (res) => {
  res.on('data', (chunk) => {
    console.log('chunk', ""+ chunk);
  })
})