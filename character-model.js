'use strict';

const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: 'String', unique: true, required: true},
  race: { type: 'String', required: true},
  vocation: { type: 'String', required: true},
  weapon: { type: 'String', required: true}
});

characterSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Character', characterSchema);