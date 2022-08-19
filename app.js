const express = require('express');
const bodyParser = require('body-parser');

const validateProduct = require('./middlewares/products');
const salesValidation = require('./middlewares/sales');
const products = require('./controllers/productsController');
const sales = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.getAll);

app.get('/products/:id', products.findById);

app.post('/products', validateProduct.validation, products.create);

app.put('/products/:id', validateProduct.validation, products.update);

app.delete('/products/:id', products.deleteId);

app.post('/sales', salesValidation.validation, sales.create);

app.get('/sales', sales.getAll);

app.get('/sales/:id', sales.findById);

app.put('/sales/:saleId', salesValidation.validation, sales.update);

app.delete('/sales/:id', sales.deleteId);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;