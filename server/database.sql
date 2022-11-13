CREATE DATABASE jwttutorial;

--instead of SERIAL PRIMARY KEY, using uuid. uuid is a more unique identifier
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);


-- --insert fake users
-- --don't need user_id because it'll automatically generate it by default
INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');