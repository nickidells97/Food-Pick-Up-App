DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name CHAR(50) NOT NULL, -- Added name
  email CHAR (50) NOT NULL, -- Added email
  phone_number BIGINT NOT NULL -- Removed status column as this was a stretch feature
);
