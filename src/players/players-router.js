const express = require('express')
const PlayersService = require('./players-service')
const { requireAuth } = require('../middleware/basic-auth')

const playersRouter = express.Router()

playersRouter
  .route('/')
  .get((req, res, next) => {
    PlayersService.getAllPlayers(req.app.get('db'))
      .then(players => {
        console.log(players)
        res.json(PlayersService.serializePlayers(players))
      })
      .catch(next)
  })

playersRouter
  .route('/MyRanks')
  .get((req, res, next) => {
    PlayersService.getAllContentForUser(req.app.get('db'), 1)
      .then(players => {
        res.json(PlayersService.serializePlayers(players))
      })
      .catch(next)
  })



/* async/await syntax for promises */
async function checkPlayerExists(req, res, next) {
  try {
    const player = await PlayersService.getById(
      req.app.get('db'),
      req.params.player_id
    )

    if (!player)
      return res.status(404).json({
        error: `Player doesn't exist`
      })

    res.player = player
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = playersRouter
