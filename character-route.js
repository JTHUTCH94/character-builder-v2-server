'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Character = require('./character-model');
//const User = require('./user-model');

const router = express.Router();

router.get('/characters', (req, res) => {
  Character.find()
    .then(characters => {
      res.json(characters);
    })
    .catch(err => {
      alert('Something went wrong');
      console.log(err);
    });
});

router.post('/characters', (req, res) => {
  const character = new Character({
    name: req.body.name,
    race: req.body.race,
    vocation: req.body.vocation,
    weapon: req.body.weapon
  });
  character.save();
  res.json(character);
});

router.put('./characters/:id', (req, res) => {
  const id = req.params.id;
  const updateObj = {};
  const updateFields = ['race', 'vocation', 'weapon'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  Character.findByIdAndUpdate(id, updateObj, { new: true})
    .then(item => {
      if (item) {
        res.json(item);
      }
    })
    .catch(err => {
      alert('Something went wrong');
      console.log(err);
    });
});

router.delete('/characters/:id', (req, res) => {
  Character.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      alert('Something went wrong');
      console.log(err);
    });
});

module.exports = router;