BEGIN;

TRUNCATE
  NBA_players,
  NBA_users,
  NBA_content
  RESTART IDENTITY CASCADE;

  

INSERT INTO NBA_players (name, team, position, age, rank, id)
VALUES
  ('Giannis Antetokounmpo', 'Milwaukee Bucks', 'SF', 24, 1, 1),
  ('Lebron James', 'LA Lakers', 'SF', 34, 2, 2),
  ('Anthony Davis',  'LA Lakers', 'SF', 27, 3, 3),
  ('James Harden',  'Houston Rockets', 'SF', 29, 4, 4),
  ('Stephen Curry', 'Golden State Warriors', 'SF', 30, 5, 5),
  ('Kawhi Leonard',  'Toronto Raptors', 'SF', 29, 6, 6),
  ('Karl-Anthony Towns',  'Minnesota Timberwolves', 'SF', 24, 7, 7),
  ('Nikola Jokic',  'Denver Nuggets', 'SF', 24, 8, 8),
  ('Russell Westbrook',  'Oklahoma City Thunder', 'SF', 30, 9, 9),
  ( 'Paul George',  'Oklahoma City Thunder', 'SF', 29, 10, 10),
  ( 'Bradley Beal',  'Washington Wizards', 'SG', 26, 11, 11),
  ( 'Joel Embiid',  'Philadelphia 76ers', 'C', 26, 12, 12),
  ( 'Ben Simmons',  'Philadelphia 76ers', 'PG', 22, 13, 13),
  ( 'Nikola Vucevic',  'Orlando Magic', 'PG', 28, 14, 14),
  ( 'Andre Drummond',  'Detroit Pistons', 'PG', 26, 15, 15),
  ( 'Kevin Durant',  'Brooklyn Nets', 'SF', 31, 16, 16),
  ( 'Rudy Gobert',  'Utah Jazz', 'C', 28, 17, 17),
  ( 'Clint Capela',  'Houston Rockets', 'C', 25, 18, 18),
  ( 'Damian Lillard',  'Portland Trailblazers', 'PG', 30, 19, 19),
  ( 'Jrue Holiday',  'New Orleans Pelicans', 'PG', 30, 20, 20)
  ;

COMMIT;


