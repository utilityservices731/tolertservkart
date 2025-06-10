const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },         
  description: { type: String, default: '' },       
  category: { type: String, required: true },       
  price: { type: Number, required: true },          
  isRent: { type: Boolean, default: false },       
  rentDuration: { type: String, default: '' },      

  condition: { type: String, enum: ['New', 'Like New', 'Used'], default: 'Used' },  
  images: { type: [String], default: [] },         
  location: { type: String, default: 'Lucknow' },   
  status: { type: String, enum: ['active', 'sold', 'rented'], default: 'active' }, 
  
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
