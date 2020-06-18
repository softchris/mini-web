const pico = require('./app');

const app = pico();
app.get("/products/:id", (req, res) => {
  console.log("query params", req.query);
  console.log('req.params', req.params);
  res.send("product id");
});

app.get('/products', (req, res) => {
  console.log('query params', req.query)
  res.send('text');
})

app.post('/products', (req,res) => {
  console.info('body', req.body)
  res.json(req.body);
})

// TODO make this work
app.get('/orders', (req, res, next) => {
  if (req.headers['authorization'] === 'abc123') {
    console.log('next', next)
    next()
  } else {
    res.statusCode = 401;
    res.send('Not allowed')
  }
}, (req, res) => {
  res.send('Protected route');
})

// TODO query parameters
// TODO middleware function middleware(req, res, next) {}

app.listen(3000, () => {
  console.log('Server running on 3000');
})