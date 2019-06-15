'use strict';
function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      password: 'password',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      password: 'password',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      password: 'password',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      password: 'password',
    },
  ];
}

function makePlayersArray(users) {
  return [
    {
      name: 'Giannis',
      team: 'Bucks',
      position: 'SF',
      age: 24,
      player_id: 1,
      user_id: users[0].id,
    }
  ];
}



function makeExpectedPlayer(users, player=[]) {
  const user = users
    .find(user => user.id === player.user_id);


  return {
    id: player.id,
    name: player.name,
    team: player.team,
    position: player.position,
    age: player.age,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
    },
  };
}


function makePlayersFixtures() {
  const testUsers = makeUsersArray();
  const testPlayers = makePlayersArray(testUsers);

  return { testUsers, testPlayers };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      playerful_players,
      playerful_users,
      RESTART IDENTITY CASCADE`
  );
}

function seedPlayersTables(db, users, players, reviews=[]) {
  return db
    .into('playerful_users')
    .insert(users)
    .then(() =>
      db
        .into('playerful_players')
        .insert(players)
    );
}


function makeAuthHeader(user) {
  const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64');
  return `Basic ${token}`;
}

module.exports = {
  makeUsersArray,
  makePlayersArray,
  makeExpectedPlayer,

  makePlayersFixtures,
  cleanTables,
  seedPlayersTables,
  makeAuthHeader,
};
