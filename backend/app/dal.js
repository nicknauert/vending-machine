const {Item, Transaction} = require('./users/models.js');

//User Actions

function getItems(){
  return Item.find();
}

function getItem(itemName){
  Item.findOne({ name: itemName })
}

function purchaseItem(itemName){
  return Item.findOne({ name: itemName }).then((item) => {
    console.log(item);
    item.quantity -= 1;
    item.save();
    return item;
  })
}

function createTransaction(item){
  console.log("Create Trans Func: ", item);
  let fullTrans= {
    time: new Date(),
    money: item.price,
    item: item.name
  }
  console.log(fullTrans);
  let trans = new Transaction(fullTrans)
  trans.save(function (err) {
    console.log(trans);
  })
}


//Vendor Actions

function getMoney(){
  return Transaction.find().then((trans) => {
    let total = 0;
    trans.forEach((item) => {
      total += item.money
    })
    return {money: total};
  })
}

function updateItem(name, item){
  Item.findOneAndUpdate(
    {
      name: name
    },
    {
      name: item.name,
      price: parseInt(item.price, 10),
      quantity: parseInt(item.quantity, 10)
    })
  .then((item) => {
    console.log(item);
    item.save();
  })
}

function getTransactions(){
  return Transaction.find()
}

function addItem(body){

  let fullItem = {
    name: body.name,
    price: body.price,
    quantity: body.quantity
  }

  let item = new Item(fullItem)
  item.save(function (err) {
    console.log(item);
  })
}


module.exports = {
  getItems,
  getItem,
  purchaseItem,
  createTransaction,
  getMoney,
  updateItem,
  getTransactions,
  addItem
}
