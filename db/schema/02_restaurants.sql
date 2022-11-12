DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL, -- Added name
  email VARCHAR (50) NOT NULL, -- Added email
  phone_number SMALLINT NOT NULL -- Removed status column as this was a stretch feature
);