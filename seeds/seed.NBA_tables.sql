BEGIN;

TRUNCATE
  NBA_players,
  NBA_users
  RESTART IDENTITY CASCADE;

INSERT INTO NBA_users (user_name, full_name, password, id)
VALUES
  ('David123', 'David N', 'Password123!', 1);
  

INSERT INTO NBA_players (name, team, position, age, id)
VALUES
  ('Giannis Antetokounmpo', 'Milwaukee Bucks', 'SF', 24, 1),
  ('Lebron James', 'Milwaukee Bucks', 'SF', 24, 2),
  ('Anthony Davis',  'Milwaukee Bucks', 'SF', 24, 3),
  ('James Harden',  'Milwaukee Bucks', 'SF', 24, 4),
  ('Stephen Curry', 'Milwaukee Bucks', 'SF', 24, 5),
  ('Kawhi Leonard',  'Milwaukee Bucks', 'SF', 24, 6),
  ('Karl-Anthony Towns',  'Milwaukee Bucks', 'SF', 24, 7),
  ('Nikola Jokic',  'Milwaukee Bucks', 'SF', 24, 8),
  ('Russell Westbrook',  'Milwaukee Bucks', 'SF', 24, 9),
  ( 'Paul George',  'Milwaukee Bucks', 'SF', 24, 10);

INSERT INTO NBA_comments (content, player_id, user_id)
VALUES
('Ex. young and talented, not injury prone, clear MVP',1,1);

INSERT INTO NBA_ranks (rank, player_id, user_id)
VALUES
(1, 1, 1);

COMMIT;
