BEGIN;

TRUNCATE
  NBA_players,
  NBA_users,
  NBA_content
  RESTART IDENTITY CASCADE;

  

INSERT INTO NBA_players (name, team, position, age, rank, id)
VALUES
  ('Giannis Antetokounmpo', 'Milwaukee Bucks', 'SF', 24, 1, 1),
  ('Lebron James', 'LA Lakers', 'SF', 24, 2, 2),
  ('Anthony Davis',  'LA Lakers', 'SF', 24, 3, 3),
  ('James Harden',  'Houston Rockets', 'SF', 24, 4, 4),
  ('Stephen Curry', 'Golden State Warriors', 'SF', 24, 5, 5),
  ('Kawhi Leonard',  'Toronto Raptors', 'SF', 24, 6, 6),
  ('Karl-Anthony Towns',  'Minnesota Timberwolves', 'SF', 24, 7, 7),
  ('Nikola Jokic',  'Denver Nuggets', 'SF', 24, 8, 8),
  ('Russell Westbrook',  'Oklahoma City Thunder', 'SF', 24, 9, 9),
  ( 'Paul George',  'Oklahoma City Thunder', 'SF', 24, 10, 10);

COMMIT;


