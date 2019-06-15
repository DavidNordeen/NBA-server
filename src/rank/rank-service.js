'use strict';

const xss = require('xss');
const Treeize = require('treeize');


const RankService = {
  getAllContentForUser(db, user_id) {
    
    return db

      .select('*', 'players.rank as defaultRank')
      .from('nba_players as players')
      .leftJoin('nba_content as ranks', function () {
        this
          .on('ranks.player_id', '=', 'players.id' )
          .andOn('ranks.user_id', '=', user_id);

      });

    // .whereNull('ranks.user_id')
    // .orWhere('ranks.user_id', user_id);
  },

  getById(db, id) {
    return RankService.getAllContentForUser(db)
      .where('rank.player_id', id)
      .first();
  },

  setContent(knex, rank, content, player_id, user_id) {
    return knex
      .select('*')
      .from('nba_content')
      .where('player_id', player_id)
      .andWhere('user_id', user_id)
      .then(function (row) {
        if (row.length > 0) {
          return knex('nba_content')
            .where('player_id', player_id)
            .andWhere('user_id', user_id)
            .update(rank ? { rank } : { content })
            .returning('*')
            .then(rows => {
              return rows[0];
            });
        }
        else {
          return knex
            .insert({ rank, content, player_id, user_id })
            .into('nba_content')
            .returning('*')
            .then(rows => {
              return rows[0];
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  },


  serializeRanks(ranks) {
    return ranks.map(this.serializeRank);
  },

  serializeRank(rank) {
    const rankTree = new Treeize();
    const rankData = rankTree.grow([rank]).getData()[0];

    return {
      rank: xss(rankData.rank),
      player_id: xss(rankData.player_id),
      user_id: rankData.user_id || {},
    };
  },
};


module.exports = RankService;




