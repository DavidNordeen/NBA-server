'use strict';

const express = require('express');
const RankService = require('./rank-service');
const { requireAuth } = require('../middleware/basic-auth');

const ranksRouter = express.Router();



ranksRouter
  .route('/MyRanks')
  .get((req, res, next) => {
    RankService.getAllContentForUser(req.app.get('db'), 1)
      .then(players => {
        // res.json(RankService.serializeRanks(players));
        res.json(players);
      })
      .catch(next);
  });

module.exports = ranksRouter;
