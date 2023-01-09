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
          "orderId" INTEGER REFERENCES orders("orderId"),
          quantity INTEGER NOT NULL,
          "userId" INTEGER REFERENCES users(id) NOT NULL,
          "gameId" INTEGER REFERENCES games(gameId),
          "consoleId" INTEGER REFERENCES console(consoleId),
          "accessoryId" INTEGER REFERENCES accessory(accessoryId),
          "collectibleId" INTEGER REFERENCES collectible(collectibleId)
        );  
    `);
        // games table

        // consoles table

        // accessories table

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
