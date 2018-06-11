var express = require('express');
var app = express();
var ejsLint = require('ejs-lint');
var bodyParser = require('body-parser');


app.use(express.static('public/css'));
app.use(bodyParser.urlencoded({ extended: true })); // necessary to parse body of request otherwise server will get undefined

app.set('view engine', 'ejs');

var products = [
    { id: 1, name: 'Drone MJX Bugs 3', brandName: 'Mysterystone', price: 120.99 },
    { id: 2, name: 'Action Camera 4K', brandName: 'FITFORT', price: 42.99 },
    { id: 3, name: 'EK7000 4K', brandName: 'AKASO', price: 67.99 }
];
// home page
app.get('/', (request, response) => {
    response.render('home');
});

// products page
app.get('/products', (request, response) => {
    response.render('products', { products: products });
});

// product page
app.get('/products/:id', (request, response) => {
    var productId = Number(request.params['id']);
    var productInfo = products.find(f => f.id === productId);
    if (productInfo) {
        response.render('product', { product: productInfo });
    } else {
        response.render('error');
    }
});

app.post('/products', (request, response) => {
    var product = {
        id: products.length + 1,
        name: request.body.name,
        brandName: request.body.brandName,
        price: request.body.price,
    };

    products.push(product);
    response.render('products', { products: products });
});

app.delete('/products/:id', (request, response) => {
    var id = +request.params['id'];
    console.log(id);
    var index = products.findIndex(f => f.id === id);
    console.log(index);
    if (index > -1) {
        products.splice(index, 1);
    }

    response.render('products', { products: products });
});

// comments page
app.get('/products/:id/comments/:commentid/:commenttitle', (request, response) => {
    response.send('This is a comment part of product page which that id is ' + request.params['id'] +
        ', commentid is: ' + request.params['commentid'] + ' and comment title is:' + request.params['commenttitle']);
});

// any pages except previous route rules
app.get('*', (request, response) => {
    response.send('404 - Page was not found');
});
// run app
app.listen(3000, () => console.log('App is listening on port 3000'));