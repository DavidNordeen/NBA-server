'use strict';

const express = require('express');
const RankService = require('./rank-service');
const { requireAuth } = require('../middleware/jwt-auth');
const jsonBodyParser = express.json();
const ranksRouter = express.Router();

//NOTE: CHANGED FROM BASIC-AUTH TO JWT-AUTH^^


ranksRouter
  .route('/MyRanks')
  .get((req, res, next) => {
    console.log(req.params, 'req.params');
    RankService.getAllContentForUser(req.app.get('db'), 1)
      .then(players => {
        // res.json(RankService.serializeRanks(players));
        res.json(players);
      })
      .catch(next);
  })
  .post(jsonBodyParser, requireAuth, (req, res) => {
    let content = req.body.comment || '';
    let ranking = req.body.ranking;
    let player_id = req.body.player_id;
    let user_id = req.user.id;
    let db = req.app.get('db');
    RankService.setContent(db, ranking, content, player_id, user_id)
      .then(function () {
        return res.status(201).send();
      });
  });

module.exports = ranksRouter;
