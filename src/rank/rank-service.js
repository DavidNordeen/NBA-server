'use strict';

const xss = require('xss');
const Treeize = require('treeize');


const RankService = {
  getAllContentForUser(db, user_id) {
    console.log(user_id);
    return db
      // .from('nba_content AS ranks')
      // .join('nba_players AS play', 'play.id', '=', 'ranks.player_id')
      // .select(
      //   'ranks.content',
      //   'ranks.player_id',
      //   'ranks.user_id',
      //   'play.name',
      //   'play.team',
      //   'play.position',
      //   'play.age',
      //   'play.rank',
      //   'play.id'
      // )
      // .where('ranks.user_id', user_id)
      // .orderBy('ranks.rank');
      .select('*', 'players.rank as defaultRank')
      .from('nba_players as players')
      .leftJoin('nba_content as ranks', 'ranks.player_id', 'players.id')
      .whereNull('ranks.user_id')
      .orWhere('ranks.user_id', user_id);
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
        if (row) {
          return knex('nba_content')
            .where('player_id', player_id)
            .andWhere('user_id', user_id)
            .update({ rank, content })
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




