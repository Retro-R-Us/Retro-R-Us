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
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          email varchar(255) UNIQUE NOT NULL,
          admin BOOLEAN DEFAULT false,
          "adminPass" varchar(50),
          "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
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

  //***** INITIAL USERS ***** */
  class buildUser {
    constructor(username, password, email, admin) {
    this.username = username,
    this.password = password,
    this.email = email,
    this.admin = admin
    }
  }

  const user1 = new buildUser("The Grim Reaper", "deathman", "Reaper@hell.com");
  const user2 = new buildUser("The Devil", "HellBoss", "TheBoss@hell.com");
  const user3 = new buildUser("Demon", "freakazoid", "freakazoid1@hell.com");
  const admin1 = new buildUser("Matt", "123123", "admin1@gmail.com", true);
  const admin2 = new buildUser("Jasmine", "456456", "admin2@gmail.com", true);
  const admin3 = new buildUser("Marty", "789789", "admin3@gmail.com", true);
  const admin4 = new buildUser("Kelan", "147147", "admin4@gmail.com", true);
  const users = [user1, user2, user3, admin1, admin2, admin3, admin4]

  const createdUsers = await Promise.all(users.map(async (user) => {
    const response = await User.createUser(user);
    console.log("Create User Response:", response)
  }))

  //***** INITIAL GAMES ***** */
  class Game {
    constructor(title, desc, console, year, price) {
      this.title = title,
      this.description = desc,
      this.console = console,
      this.year = year,
      this.price = price
    }
  }

  const game1 = new Game(
      "Donkey Kong", 
      "Badass monkeys kicking the shit out of enemies and collecting those bananas",
      "N64",
      "1999",
      19.99
    )
  const game2 = new Game(
      "Crash Bandicoot: WARPED!", 
      "a platform game in which the player takes control of Crash and Coco Bandicoot, who must travel back and forward in time and gather 25 crystals before Uka Uka and Doctor Neo Cortex can do so.",
      "Playstation",
      "1998",
      19.99
    )
  const game3 = new Game(
    "Halo: Combat Evolved",
    "a first-person shooter (FPS). The game features vehicles, ranging from armored 4x4s and tanks to alien hovercraft and aircraft. The game also allows vehicle use for pilots and mounted gun operators.",
    "Xbox",
    "2001",
    29.99
  )
  const game4 = new Game(
    "Silent Hill",
    "A survival horror game with lots of fog and lose of sanity, you play as Harry Mason looking for your missing daughter. Parent of the year award here.",
    "Playstation",
    "1999",
    24.99
  )
  const game5 = new Game(
    "Resident Evil 4",
    "Play as Leon S. Kennedy in this third person shooter trying to save the president's daughter. Visit rural Spain as you battle the infected villagers and hope to survive this nightmare.",
    "Playstation 2",
    "2005",
    39.99
  )
  const game6 = new Game(
    "Mario Kart Double Dash!!",
    "Enjoy having a backseat driver but they throw things out the side of the kart for you! All your favorite characters are back for more karting fun.",
    "GameCube",
    "2003",
    19.99
  )
  const game7 = new Game(
    "Guitar Hero",
    "Wanna pretend to be a rock star? Well then play along with your favorite rock tunes, in style with a plastic guitar.",
    "Playstation 2",
    "2005",
    9.99
  )
  const game8 = new Game(
    "Assassin's Creed III",
    "An action-adventure game where you play as an assassin throughout the ages. This open world games in third person takes you back to 18th Century America.",
    "XBOX 360",
    "2012",
    39.99
  )
  const game9 = new Game(
    "Diner Dash",
    "Want to feel the stress of owning a restaurant? Perfect! Play as Flo and try to keep all your customers happy and make sure it all doesn't burn down.",
    "PSP",
    "2007",
    9.99
  )
  const game10 = new Game(
    "GAME",
    "DESCRIPTION",
    "PLATFORM",
    "YEAR",
    29.99
  )

  const games = [game1, game2, game3, game4, game5, game6, game7, game8, game9, game10];
  const createdGames = await Promise.all(games.map(async (game) =>  {
    const response = await Games.createGameListing(game);
    console.log("Initial Games Created:", response);
  }))

  //***** INITIAL CONSOLES ***** */
  class createConsole {
    constructor(title, desc, year, price) {
      this.title = title,
      this.description = desc,
      this.year = year,
      this.price = price
    }
  }

  const con1 = new createConsole()
  const con2 = new createConsole()
  const con3 = new createConsole()


  //***** INITIAL COLLECTIBLES ***** */
  class createCol {
    constructor(title, desc, console, price) {
      this.title = title,
      this.description = desc,
      this.console = console,
      this.price = price
    }
  }

  const coll1 = new createConsole()
  const coll2 = new createConsole()
  const coll3 = new createConsole()

  //***** INITIAL ACCESSORIES ***** */
  class createAcc {
    constructor(title, desc, console, year, price) {
      this.title = title,
      this.description = desc,
      this.console = console,
      this.price = price
    }
  }

  const acc1 = new createConsole()
  const acc2 = new createConsole()
  const acc3 = new createConsole()

  //***** INITIAL ORDERS ***** */
  class createOr {
    constructor(userId, status) {
      this.userId = userId,
      this.status = status
    }
  }

  const order1 = new createConsole()
  const order2 = new createConsole()
  const order3 = new createConsole()

  //***** INITIAL CART ***** */
  class createCart {
    constructor(orderId, quantity, userId, gameId, consoleId, accessoryId, collectibleId) {
      this.orderId = orderId,
      this.quantity = quantity,
      this.userId = userId,
      this.gameId = gameId,
      this.consoleId = consoleId,
      this.accessoryId = accessoryId,
      this.collectibleId = collectibleId
    }
  }

  const cart1 = new createConsole()
  const cart2 = new createConsole()
  const cart3 = new createConsole()


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
