function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makePlayersArray(users) {
  return [
    {
      id: 1,
      title: 'First test player!',
      image: 'http://placehold.it/500x500',
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test player!',
      image: 'http://placehold.it/500x500',
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test player!',
      image: 'http://placehold.it/500x500',
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test player!',
      image: 'http://placehold.it/500x500',
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeReviewsArray(users, players) {
  return [
    {
      id: 1,
      rating: 2,
      text: 'First test review!',
      player_id: players[0].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      rating: 3,
      text: 'Second test review!',
      player_id: players[0].id,
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      rating: 1,
      text: 'Third test review!',
      player_id: players[0].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      rating: 5,
      text: 'Fourth test review!',
      player_id: players[0].id,
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 5,
      rating: 1,
      text: 'Fifth test review!',
      player_id: players[players.length - 1].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 6,
      rating: 2,
      text: 'Sixth test review!',
      player_id: players[players.length - 1].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 7,
      rating: 5,
      text: 'Seventh test review!',
      player_id: players[3].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeExpectedPlayer(users, player, reviews=[]) {
  const user = users
    .find(user => user.id === player.user_id)

  const playerReviews = reviews
    .filter(review => review.player_id === player.id)

  const number_of_reviews = playerReviews.length
  const average_review_rating = calculateAverageReviewRating(playerReviews)

  return {
    id: player.id,
    image: player.image,
    title: player.title,
    content: player.content,
    date_created: player.date_created,
    number_of_reviews,
    average_review_rating,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      nickname: user.nickname,
      date_created: user.date_created,
    },
  }
}

function calculateAverageReviewRating(reviews) {
  if(!reviews.length) return 0

  const sum = reviews
    .map(review => review.rating)
    .reduce((a, b) => a + b)

  return Math.round(sum / reviews.length)
}

function makeExpectedPlayerReviews(users, playerId, reviews) {
  const expectedReviews = reviews
    .filter(review => review.player_id === playerId)

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id)
    return {
      id: review.id,
      text: review.text,
      rating: review.rating,
      date_created: review.date_created,
      user: {
        id: reviewUser.id,
        user_name: reviewUser.user_name,
        full_name: reviewUser.full_name,
        nickname: reviewUser.nickname,
        date_created: reviewUser.date_created,
      }
    }
  })
}

function makeMaliciousPlayer(user) {
  const maliciousPlayer = {
    id: 911,
    image: 'http://placehold.it/500x500',
    date_created: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedPlayer = {
    ...makeExpectedPlayer([user], maliciousPlayer),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousPlayer,
    expectedPlayer,
  }
}

function makePlayersFixtures() {
  const testUsers = makeUsersArray()
  const testPlayers = makePlayersArray(testUsers)
  const testReviews = makeReviewsArray(testUsers, testPlayers)
  return { testUsers, testPlayers, testReviews }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      playerful_players,
      playerful_users,
      playerful_reviews
      RESTART IDENTITY CASCADE`
  )
}

function seedPlayersTables(db, users, players, reviews=[]) {
  return db
    .into('playerful_users')
    .insert(users)
    .then(() =>
      db
        .into('playerful_players')
        .insert(players)
    )
    .then(() =>
      reviews.length && db.into('playerful_reviews').insert(reviews)
    )
}

function seedMaliciousPlayer(db, user, player) {
  return db
    .into('playerful_users')
    .insert([user])
    .then(() =>
      db
        .into('playerful_players')
        .insert([player])
    )
}

function makeAuthHeader(user) {
  const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
  return `Basic ${token}`
}

module.exports = {
  makeUsersArray,
  makePlayersArray,
  makeExpectedPlayer,
  makeExpectedPlayerReviews,
  makeMaliciousPlayer,
  makeReviewsArray,

  makePlayersFixtures,
  cleanTables,
  seedPlayersTables,
  seedMaliciousPlayer,
  makeAuthHeader,
}
