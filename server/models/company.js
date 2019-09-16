const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const companySchema = new Schema({
  name: {type: String, required: true },
  user_id: {type: String, required: true },
  bonuces: [
      {
          name: { type: String },
          price: { type: Number },
          about: { type: String }
      }
  ],
  story: { type: String, required: true },
  thematic: { type: String },
  tags: { type: [String] },
  images: { type: [String] },
  video: { type: String },
  goal: { type: Number, required: true },
  presently: { type: Number, default: 0 },
  expiration_date: { type: Date, required: true },
  update_date: { type: Date },
  comments: [
      {
      user_id: { type: String },
      user_name: { type: String},
      profile_img: { type: String },
      text: { type: String}
    }
  ],
  news: [
    {
      title: { type: String },
      create_date: { type: Date },
      text: { type: String },
      image: { type: String }
    }
  ]
}).index({'$**': 'text'});
 
const Company = mongoose.model('Company', companySchema, 'companies');
 
module.exports = Company;