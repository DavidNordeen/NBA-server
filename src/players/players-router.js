'use strict';
const express = require('express');
const PlayersService = require('./players-service');


const playersRouter = express.Router();

playersRouter
  .route('/')
  .get((req, res, next) => {
    throw 'hello David';
    // PlayersService.getAllPlayers(req.app.get('db'))
    //   .then(players => {
    //     res.json(PlayersService.serializePlayers(players));
    //   })
    //   .catch(next);
  });


module.exports = playersRouter;
