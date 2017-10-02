const express = require('express');
const app = express();
const router = require('express').Router();
const {
  getItems,
  getItem,
  purchaseItem,
  createTransaction,
  getMoney,
  updateItem,
  getTransactions,
  addItem
} = require('./dal');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const {Item, Transaction} = require('./users/models.js');
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/vending');

app.use(express.static('./frontend/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



///////////// ROUTES ///////////////

//handle non-existent items
//handle correct change?

app.get('/api/customer/items', (req, res) =>{
  getItems().then((items)=>{
    res.json(items)
  })
})

app.post('/api/customer/items/:itemName/purchases', (req, res) => {

  purchaseItem(req.params.itemName).then((items)=>{
    console.log("App.js", items);
    createTransaction(items);
    res.send("Item Bought.");
  })
})

app.get('/api/vendor/purchases', (req, res) => {
  getTransactions().then((transactions) => {
    res.json(transactions);
  })
})

app.get('/api/vendor/money', (req, res) => {
  getMoney().then((money) => {
    res.json(money)
  })
})

app.post('/api/vendor/items', (req, res) => {
  console.log("req dat body: " + req.body.name);
  addItem(req.body);
  res.send('Item Added.');
})

app.put('/api/vendor/items/:itemName', (req, res) => {
  console.log(req.body);
  updateItem(req.params.itemName, req.body);
  res.send('Updated item.')
})


app.listen(3000, () => {
  console.log('API Started on 3000.');
})

//////////// OLD ROUTES ////////////////
//
//
//
// app.get('/feed', ensureAuthentication, (req, res) => {
//   getAllSnippets().then((snippets) => {
//     res.render('feed', {snips: snippets.reverse()})
//   })
// })
//
// app.post('/feed', ensureAuthentication, (req, res) => {
//   searchSnippets(req.body.searchInput).then((snippets) => {
//     console.log(snippets)
//     res.render('feed', {snips: snippets.reverse()})
//   })
// })
//
// app.get('/author/:username', ensureAuthentication, ({params}, res) => {
//   getAuthorAndSnips(params.username).then((foundAuthor) => {
//     console.log(foundAuthor);
//     res.render('authorPg', {author: foundAuthor});
//   })
// })
//
// app.get('/authors', ensureAuthentication, (req, res) => {
//   getAllAuthors().then((authors) => {
//     res.render('authors', {authors})
//   })
// })
//
// app.get('/create', ensureAuthentication, (req, res) => {
//     res.render('create')
// })
// app.post('/create', ensureAuthentication, (req, res) => {
//     createSnippet(req.body, req.session.jwtToken.token);
//     res.redirect('/feed')
// })
//
// app.get('/logout', (req, res) => {
//   req.session.jwtToken = null
//   res.redirect('/login')
// })
