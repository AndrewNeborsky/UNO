const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  id: { type: String },
  provider: { type: String, default: 'local'},
  name: {type: String, required: true },
  email: {type: String, required: true},
  password: { type: String },
  profile_img: { type: String, default: 'http://www.urhobosocialclublagos.com/wp-content/uploads/2017/07/default-avatar-ginger-guy.png' },
  background: { type: String },
  isBlock: {type: Boolean, default: false },
  access: { type: String, default: 'user' },
  about: { type: String }
});
 
const User = mongoose.model('User', userSchema, 'users');
 
module.exports = User;