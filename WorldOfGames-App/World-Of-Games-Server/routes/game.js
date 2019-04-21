const express = require('express')
const authCheck = require('../middleware/auth-check');
const Game = require('../models/Game');
const User = require('../models/User');

const router = new express.Router()

function validateGameForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.year = parseInt(payload.year)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.make = 'Title must be more than 3 symbols.'
  }

  if (!payload || typeof payload.genre !== 'string' || payload.genre.length < 3) {
    isFormValid = false
    errors.genre = 'Genre must be more than 3 symbols.'
  }

  if (!payload || !payload.year || payload.year < 1950 || payload.year > 2019) {
    isFormValid = false
    errors.year = 'Year must be between 1950 and 2019.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10) {
    isFormValid = false
    errors.description = 'Description must be more than 10 symbols.'
  }

  if (!payload || typeof payload.image !== 'string' || payload.image.length === 0) {
    isFormValid = false
    errors.image = 'Image URL is required.'
  }

  if (!payload || typeof payload.trailer !== 'string' || payload.trailer.length === 0) {
    isFormValid = false
    errors.trailer = 'Trailer URL is required.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/mygames', authCheck, async (req, res) => {
  const userId = req.user._id;
  const game = req.body;

  Game.findById(game.id)
    .then((game) => {
      game.users.push(userId);
      game.save();
      res.status(200).json({
        success: true,
        message: 'Game already in your favourites!',
        game
      })
    })

  User.findById(userId)
    .then((user) => {
      if (user.games.includes(game)) {
        return res.status(400).json({
          success: false,
          message: 'Game already in your favourites!'
        })
      }
      user.games.push(game);
      user.save();
      res.status(200).json({
        success: true,
        message: 'Game added successfully to favourites.',
        user
      })
    });
})

router.post('/create', authCheck, (req, res) => {
  const game = req.body
  const validationResult = validateGameForm(game)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Game.create(game)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Game added successfully.',
        game
      })
    })
})

router.get('/all', authCheck, (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  Game.find({})
    .then((game) => {
      return res.status(200).json(game)
    })
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id
  Game.findById(id)
    .then((game) => {
      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        title: game.title,
        genre: game.genre,
        year: game.year,
        description: game.description,
        image: game.image,
        trailer: game.trailer,
      }

      res.status(200).json(response)
    })
})


router.get('/user', authCheck, (req, res) => {
  const user = req.user;

  Game.find({ users: user._id })
    .then((game) => {
      return res.status(200).json(game)
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user._id

  Game.findById(id)
    .then((game) => {
      if (!game) {
        return res.status(200).json({
          success: false,
          message: 'Game does not exists!'
        })
      }

      if ((game.creator.toString() != user && !req.user.roles.includes("Admin"))) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized!'
        })
      }

      Game.findByIdAndDelete(id)
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Game deleted successfully!'
          })
        })
    })
})

router.put('/edit/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const game = req.body;

  if (!game) {
    return res.status(404).json({
      success: false,
      message: 'Game does not exists!'
    })
  }

  if (!req.user.roles.includes('Admin')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!'
    })
  }

  const validationResult = validateGameForm(game)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Game.findByIdAndUpdate(id, game)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Game edited successfully!'
      })
    })
})

router.get('/:id', authCheck, (req, res) => {
  const id = req.params.id

  Game.findById(id)
    .then(game => {
      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        title: game.title,
        genre: game.genre,
        year: game.year,
        description: game.description,
        image: game.image,
        trailer: game.trailer,
      }

      res.status(200).json(response)
    })
})

module.exports = router
