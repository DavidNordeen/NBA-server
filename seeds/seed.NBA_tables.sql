BEGIN;

TRUNCATE
  NBA_players,
  NBA_users,
  NBA_content
  RESTART IDENTITY CASCADE;

INSERT INTO NBA_users (user_name, full_name, password, id)
VALUES
  ('David123', 'David N', 'Password123!', 1);
  

INSERT INTO NBA_players (name, team, position, age, rank, id)
VALUES
  ('Giannis Antetokounmpo', 'Milwaukee Bucks', 'SF', 24, 1, 1),
  ('Lebron James', 'Milwaukee Bucks', 'SF', 24, 2, 2),
  ('Anthony Davis',  'Milwaukee Bucks', 'SF', 24, 3, 3),
  ('James Harden',  'Milwaukee Bucks', 'SF', 24, 4, 4),
  ('Stephen Curry', 'Milwaukee Bucks', 'SF', 24, 5, 5),
  ('Kawhi Leonard',  'Milwaukee Bucks', 'SF', 24, 6, 6),
  ('Karl-Anthony Towns',  'Milwaukee Bucks', 'SF', 24, 7, 7),
  ('Nikola Jokic',  'Milwaukee Bucks', 'SF', 24, 8, 8),
  ('Russell Westbrook',  'Milwaukee Bucks', 'SF', 24, 9, 9),
  ( 'Paul George',  'Milwaukee Bucks', 'SF', 24, 10, 10);

INSERT INTO NBA_content (content, rank, player_id, user_id)
VALUES
('Ex. young and talented, not injury prone, clear MVP', 10, 1,1),
('', 2, 2, 1),
('', 3, 3, 1),
('', 4, 4, 1),
('', 5, 5, 1),
('', 6, 6, 1),
('', 7, 7, 1),
('', 8, 8, 1),
('', 9, 9, 1),
('', 1, 10, 1);


COMMIT;
