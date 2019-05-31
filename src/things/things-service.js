'use strict';

const xss = require('xss');
const Treeize = require('treeize');

const PlayersService = {
  getAllPlayers(db) {
    return db
      .from('nba_players AS play')
      .select(
        'play.name',
        'play.team',
        'play.position',
        'play.age',
        'play.id'
      );
  },



  getAllPlayersForUser(db, user_id) {
    return db
      .from('nba_ranks AS ranks')
      .where(`ranks.user_id = ${user_id}`)
      .innerJoin('nba_players AS play', 'play.id = ranks.player_id')
      .select(
        'play.name',
        'play.team',
        'play.position',
        'play.age',
        'play.id'
      )
      .groupBy('ranks.rank');
  },



  getById(db, id) {
    return PlayersService.getAllPlayers(db)
      .where('play.id', id)
      .first();
  },


  serializePlayers(players) {
    return players.map(this.serializePlayer);
  },

  serializePlayer(player) {
    const playerTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const playerData = playerTree.grow([player]).getData()[0];

    return {
      id: playerData.id,
      name: xss(playerData.name),
      team: xss(playerData.team),
      position: xss(playerData.position),
      age: xss(playerData.age),
      user: playerData.user || {},
    };
  },
};

// const userFields = [
//   'usr.id AS user:id',
//   'usr.user_name AS user:user_name',
//   'usr.full_name AS user:full_name',
// ];

module.exports = PlayersService;
