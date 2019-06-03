const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Players Endpoints', function() {
  let db

  const {
    testUsers,
    testPlayers,
    testReviews,
  } = helpers.makePlayersFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/players`, () => {
    context(`Given no players`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/players')
          .expect(200, [])
      })
    })

    context('Given there are players in the database', () => {
      beforeEach('insert players', () =>
        helpers.seedPlayersTables(
          db,
          testUsers,
          testPlayers,
          testReviews,
        )
      )

      it('responds with 200 and all of the players', () => {
        const expectedPlayers = testPlayers.map(player =>
          helpers.makeExpectedPlayer(
            testUsers,
            player,
            testReviews,
          )
        )
        return supertest(app)
          .get('/api/players')
          .expect(200, expectedPlayers)
      })
    })

    context(`Given an XSS attack player`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousPlayer,
        expectedPlayer,
      } = helpers.makeMaliciousPlayer(testUser)

      beforeEach('insert malicious player', () => {
        return helpers.seedMaliciousPlayer(
          db,
          testUser,
          maliciousPlayer,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/players`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedPlayer.title)
            expect(res.body[0].content).to.eql(expectedPlayer.content)
          })
      })
    })
  })

  describe(`GET /api/players/:player_id`, () => {
    context(`Given no players`, () => {
      beforeEach(() =>
        db.into('playerful_users').insert(testUsers)
      )
      it(`responds with 404`, () => {
        const playerId = 123456
        return supertest(app)
          .get(`/api/players/${playerId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Player doesn't exist` })
      })
    })

    context('Given there are players in the database', () => {
      beforeEach('insert players', () =>
        helpers.seedPlayersTables(
          db,
          testUsers,
          testPlayers,
          testReviews,
        )
      )

      it('responds with 200 and the specified player', () => {
        const playerId = 2
        const expectedPlayer = helpers.makeExpectedPlayer(
          testUsers,
          testPlayers[playerId - 1],
          testReviews,
        )

        return supertest(app)
          .get(`/api/players/${playerId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedPlayer)
      })
    })

    context(`Given an XSS attack player`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousPlayer,
        expectedPlayer,
      } = helpers.makeMaliciousPlayer(testUser)

      beforeEach('insert malicious player', () => {
        return helpers.seedMaliciousPlayer(
          db,
          testUser,
          maliciousPlayer,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/players/${maliciousPlayer.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedPlayer.title)
            expect(res.body.content).to.eql(expectedPlayer.content)
          })
      })
    })
  })

  describe(`GET /api/players/:player_id/reviews`, () => {
    context(`Given no players`, () => {
      beforeEach(() =>
        db.into('playerful_users').insert(testUsers)
      )
      it(`responds with 404`, () => {
        const playerId = 123456
        return supertest(app)
          .get(`/api/players/${playerId}/reviews`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Player doesn't exist` })
      })
    })

    context('Given there are reviews for player in the database', () => {
      beforeEach('insert players', () =>
        helpers.seedPlayersTables(
          db,
          testUsers,
          testPlayers,
          testReviews,
        )
      )

      it('responds with 200 and the specified reviews', () => {
        const playerId = 1
        const expectedReviews = helpers.makeExpectedPlayerReviews(
          testUsers, playerId, testReviews
        )

        return supertest(app)
          .get(`/api/players/${playerId}/reviews`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedReviews)
      })
    })
  })
})
