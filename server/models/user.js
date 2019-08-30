const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  id: { type: String },
  name: {type: String, required: true },
  email: {type: String, required: true},
  password: { type: String },
  provider: { type: String, default: 'local'}
});
 
const User = mongoose.model('User', userSchema, 'users');
 
module.exports = User;