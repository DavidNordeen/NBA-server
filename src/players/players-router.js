'use strict';
const express = require('express');
const PlayersService = require('./players-service');


const playersRouter = express.Router();

playersRouter
  .route('/')
  .get((req, res, next) => {
    console.log('hello from getAllPlayers!!!!!');
    PlayersService.getAllPlayers(req.app.get('db'))
      .then(players => {
        res.json(PlayersService.serializePlayers(players));
      })
      .catch(next);
  });


module.exports = playersRouter;
