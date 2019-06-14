'use strict';

const express = require('express');
const RankService = require('./rank-service');
const { requireAuth } = require('../middleware/jwt-auth');
const jsonBodyParser = express.json();
const ranksRouter = express.Router();


ranksRouter
  .route('/MyRanks')
  .get(requireAuth, (req, res, next) => {
    let user_id = req.user.id;
    console.log(req.params, 'req.params');
    RankService.getAllContentForUser(req.app.get('db'), user_id)
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
