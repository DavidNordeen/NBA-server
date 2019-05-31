'use strict';

const xss = require('xss');
const Treeize = require('treeize');

const RankService = {
  getAllRanks(db) {
    return db
      .from('nba_ranks AS rank')
      .select(
        'rank.rank',
        'rank.player_id',
        'rank.user_id'    
      );
  },

  getById(db, id) {
    return RankService.getAllRanks(db)
      .where('rank.player_id', id)
      .first();
  },


  serializeRanks(ranks) {
    return ranks.map(this.serializeRank);
  },

  serializeRank(rank) {
    const rankTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const rankData = rankTree.grow([rank]).getData()[0];

    return {
      rank: xss(rankData.rank),
      player_id: xss(rankData.player_id),
      user_id: rankData.user_id || {},
    };
  },
};


module.exports = RankService;
