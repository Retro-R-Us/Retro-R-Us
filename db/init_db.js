const {
  client,
  // declare your model imports here
  // for example, User
  User,
  Acc,
  Games,
  Orders,
  Consoles
} = require('./');

async function dropTables() {
  console.log("Attempting to drop tables.")
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS consoles;
      DROP TABLE IF EXISTS games;
      DROP TABLE IF EXISTS collectibles;
      DROP TABLE IF EXISTS accessories;
      DROP TABLE IF EXISTS users;
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
          admin BOOLEAN NOT NULL,
          "adminPass" varchar(50),
          created_on TIMESTAMP NOT NULL
          );
        `);

        // orders table
    await client.query(`
        CREATE TABLE orders (
          "orderId" SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          status varchar(255) NOT NULL
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
          price numeric(18,2) NOT NULL
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
        await client.query(`
        CREATE TABLE collectibles (
          "collectibleId" SERIAL PRIMARY KEY,
          title varchar(50) NOT NULL,
          description varchar(50) NOT NULL,
          console varchar(50),
          price numeric(18,2) NOT NULL
          );
        `);

        // cart table
      await client.query(`
        CREATE TABLE cart (
          "cartId" SERIAL PRIMARY KEY,
          "orderId" INTEGER REFERENCES orders("orderId"),
          quantity INTEGER NOT NULL,
          "userId" INTEGER REFERENCES users(id) NOT NULL,
          "gameId" INTEGER REFERENCES games("gameId"),
          "consoleId" INTEGER REFERENCES consoles("consoleId"),
          "accessoryId" INTEGER REFERENCES accessories("accessoryId"),
          "collectibleId" INTEGER REFERENCES collectibles("collectibleId")
          );
      `);

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
