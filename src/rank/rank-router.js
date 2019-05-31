'use strict';

const express = require('express');
const RankService = require('./rank-service');
const { requireAuth } = require('../middleware/basic-auth');

const ranksRouter = express.Router();

ranksRouter
  .route('/')
  .get((req, res, next) => {
    RankService.getAllRanks(req.app.get('db'))
      .then(ranks => {
        res.json(RankService.serializeRanks(ranks));
      })
      .catch(next);
  });



module.exports = ranksRouter;
