const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
})

const TransactionSchema = new mongoose.Schema({
  time: Date,
  money: Number,
  item: String
})

const Item = mongoose.model('Item', ItemSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = {
  Item, Transaction
}
