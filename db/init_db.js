const {
  client,
  // declare your model imports here
  // for example, User
  createUser
} = require('./');

async function dropTables() {
  console.log("Attempting to drop tables.")
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS consoles;
      DROP TABLE IF EXISTS games;
      DROP TABLE IF EXISTS accessories;
    `);

    console.log("Tables Successfully Dropped.")
  } catch (error) {
    console.log("Could not drop tables.")
    throw error;
  }
}

async function buildTables() {
  console.log("Attempting to build tables.")
  try {
    // build tables in correct order
    // users table
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(50) UNIQUE NOT NULL,
          password varchar(50) NOT NULL,
          email varchar(254) UNIQUE NOT NULL,
          created_on TIMESTAMP NOT NULL
          );
        `);

        // orders table

        // cart table
    await client.query(`
        CREATE TABLE cart (
          "cartId" SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id) NOT NULL,
          "gameId" INTEGER REFERENCES games(gameId),
          "consoleId" INTEGER REFERENCES console(consoleId),
          "accessoryId" INTEGER REFERENCES accessory(accessoryId),
          "collectibleId" INTEGER REFERENCES collectible(collectibleId)
        );  
    `);
        // games table
    await client.query(`
        CREATE TABLE games (
          "gameId" SERIAL PRIMARY KEY,
          title varchar(50) NOT NULL,
          description varchar(255) NOT NULL,
          console varchar(50) NOT NULL,
          year integer NOT NULL,
          price numeric(18,2) NOT NULL
          );
        `);

        // consoles table
        await client.query(`
        CREATE TABLE consoles (
          "consoleId" SERIAL PRIMARY KEY,
          title varchar(50) NOT NULL,
          description varchar(50) NOT NULL,
          year integer NOT NULL,
          price numeric(18,2) NOT NULL,
          );
        `);

        // accessories table
    await client.query(`
        CREATE TABLE accessories (
          "accessoryId" SERIAL PRIMARY KEY,
          title varchar(50) NOT NULL,
          description varchar(255) NOT NULL,
          console varchar(50) NOT NULL,
          price numeric(18,2) NOT NULL
          );
        `);

        // collectibles table

    console.log("Tables Successfully built.")
  } catch (error) {
    console.log("Could not build tables.")
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Creating starting users.");


    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

dropTables()
.then(buildTables)
.then(populateInitialData)
.catch(console.error)
.finally(() => client.end());
