const {
  client,
  User,
  Collectibles,
  Acc,
  Games,
  Orders,
  Consoles,
  Cart
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
        admin BOOLEAN NOT NULL,
        "adminPass" varchar(50),
        "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // orders table
    await client.query(`
      CREATE TABLE orders (
        "orderId" SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        status varchar(50) NOT NULL,
        "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // games table
    await client.query(`
      CREATE TABLE games (
        "gameId" SERIAL PRIMARY KEY,
        title varchar(100) NOT NULL,
        description varchar(255) NOT NULL,
        console varchar(50) NOT NULL,
        year integer NOT NULL,
        price numeric(18,2) NOT NULL,
        image varchar(255)
      );
    `);

    // consoles table
    await client.query(`
      CREATE TABLE consoles (
        "consoleId" SERIAL PRIMARY KEY,
        title varchar(100) NOT NULL,
        description varchar(255) NOT NULL,
        year integer NOT NULL,
        price numeric(18,2) NOT NULL,
        image varchar(255)
      );
    `);

    // accessories table
    await client.query(`
      CREATE TABLE accessories (
        "accessoryId" SERIAL PRIMARY KEY,
        title varchar(100) NOT NULL,
        description varchar(255) NOT NULL,
        console varchar(50) NOT NULL,
        price numeric(18,2) NOT NULL,
        image varchar(255)
      );
    `);

    // collectibles table
    await client.query(`
      CREATE TABLE collectibles (
        "collectibleId" SERIAL PRIMARY KEY,
        title varchar(100) NOT NULL,
        description varchar(255) NOT NULL,
        console varchar(50),
        price numeric(18,2) NOT NULL,
        image varchar(255)
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
    console.log("Creating Initial users");

    //***** INITIAL USERS ***** */
    class buildUser {
      constructor(username, password, email, admin) {
        this.username = username,
        this.password = password,
        this.email = email,
        this.admin = admin || false
      }
    }

    const user1 = new buildUser("The Grim Reaper", "deathman", "Reaper@hell.com");
    const user2 = new buildUser("The Devil", "HellBoss", "TheBoss@hell.com");
    const user3 = new buildUser("Demon", "freakazoid", "freakazoid1@hell.com");
    const admin1 = new buildUser("Remics89", "123123123", "admin1@gmail.com", true);
    const admin2 = new buildUser("JHoolwerf", "456456456", "admin2@gmail.com", true);
    const admin3 = new buildUser("Matrixman", "789789789", "admin3@gmail.com", true);
    const admin4 = new buildUser("Kaypaint", "147147147", "admin4@gmail.com", true);

    const users = [user1, user2, user3, admin1, admin2, admin3, admin4]
    const createdUsers = await Promise.all(users.map(user => User.createUser(user)))
    console.log("Initial Users Created")

    //***** INITIAL GAMES ***** */

    console.log("Creating Initial Games")
    class Game {
      constructor(title, desc, console, year, price, image) {
        this.title = title,
        this.description = desc,
        this.console = console,
        this.year = year,
        this.price = price,
        this.image = image
      }
    }

    const game1 = new Game(
      "Donkey Kong", 
      "Badass monkeys kicking the shit out of enemies and collecting those bananas",
      "N64",
      "1999",
      19.99,
      "https://upload.wikimedia.org/wikipedia/en/a/ae/DonkeyKong64CoverArt.jpg"
    )

    const game2 = new Game(
      "Crash Bandicoot: WARPED!", 
      "a platform game in which the player takes control of Crash and Coco Bandicoot, who must travel back and forward in time and gather 25 crystals before Uka Uka and Doctor Neo Cortex can do so.",
      "Playstation",
      "1998",
      19.99,
      "https://upload.wikimedia.org/wikipedia/en/3/3e/Crash_Bandicoot_3_Warped_Original_Box_Art.jpg"
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
      "Xbox 360",
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
      "Final Fantasy VII",
      "A role-playing game where you play as Cloud Strife and his friends as they try to save the world from the evil Shinra Corporation.",
      "Playstation",
      "1997",
      19.99
    )

    const game11 = new Game(
      "Super Mario 64",
      "The first 3D Mario game where you play as Mario and his friends as they try to save Princess Peach from Bowser.",
      "N64",
      "1996",
      19.99
    )

    const game12 = new Game(
      "Super Smash Bros. Melee",
      "The second installment of the Super Smash Bros. series where you play as your favorite Nintendo characters and try to knock each other out of the arena.",
      "GameCube",
      "2001",
      19.99
    )

    const games = [game1, game2, game3, game4, game5, game6, game7, game8, game9, game10, game11, game12];
  
    const createdGames = await Promise.all(games.map(game =>  Games.createGameListing(game)))
    console.log("Initial Games Created")

    //***** INITIAL CONSOLES ***** */
    console.log("Creating Initial Consoles")

    class createConsole {
      constructor(title, desc, year, price, image) {
        this.title = title,
        this.description = desc,
        this.year = year,
        this.price = price,
        this.image = image
      }
    }

    const con1 = new createConsole(
      "Nintendo 64",
      "The Nintendo 64 is a home video game console developed and released by Nintendo in 1996. Nintendo's third home console, following the Nintendo Entertainment System (NES) and Super Nintendo Entertainment System (SNES).",
      "1996",
      99.99
    )

    const con2 = new createConsole(
      "Playstation",
      "The PlayStation is a video game console developed and marketed by Sony Computer Entertainment. The console was released on December 3, 1994 in Japan, September 9, 1995 in North America, October 29, 1995 in Europe, and November 15, 1995 in Australia.",
      "1994",
      99.99
    )

    const con3 = new createConsole(
      "Xbox",
      "The Xbox is a home video game console and the first installment in the Xbox series of consoles manufactured by Microsoft. It was released on November 15, 2001 in North America, followed by Australia, Europe and Japan in 2002.",
      "2001",
      99.99
    )

    const con4 = new createConsole(
      "GameCube",
      "The GameCube is a home video game console released by Nintendo in Japan on September 14, 2001; in North America on November 18, 2001; in Europe on May 3, 2002; and in Australia on May 17, 2002.",
      "2001",
      99.99
    )

    const con5 = new createConsole(
      "Playstation 2",
      "The PlayStation 2 is a home video game console that was developed by Sony Computer Entertainment. It is the successor to the original PlayStation, and is the second installment in the PlayStation lineup of consoles.",
      "2000",
      99.99
    )

    const con6 = new createConsole(
      "Xbox 360",
      "The Xbox 360 is a home video game console developed by Microsoft. As the successor to the original Xbox, it is the second console in the Xbox series.",
      "2005",
      99.99
    )

    const con7 = new createConsole(
      "PSP",
      "The PlayStation Portable is a handheld game console developed and marketed by Sony Computer Entertainment. Development of the handheld was announced during E3 2003, and it was unveiled on May 11, 2004, at a Sony press conference before E3 2004.",
      "2004",
      99.99
    )

    const con8 = new createConsole(
      "GameBoy",
      "The GameBoy is a handheld game console developed and manufactured by Nintendo. The first handheld in the industry to use replaceable cartridges. It was released in Japan on April 21, 1989, and in North America on July 31, 1989.",
      "1989",
      99.99
    )

    const consoles = [con1, con2, con3, con4, con5, con6, con7, con8];

    const createdConsoles = await Promise.all(consoles.map(somecon => Consoles.createConsoleListing(somecon)))
    console.log("Initial Consoles Created")

    //***** INITIAL COLLECTIBLES ***** */
    console.log("Creating Initial Collectibles")


    class createCol {
      constructor(title, desc, console, price, image) {
        this.title = title,
        this.description = desc,
        this.console = console,
        this.price = price,
        this.image = image
      }
    }

    const coll1 = new createCol(
      "Mario Statue",
      "This is a statue of Mario from the Super Mario Bros. series. It is a 1:1 scale replica of the character, and is made of plastic.",
      "N64",
      49.99
    )
    const coll2 = new createCol(
      "Crash Bandicoot Statue",
      "This is a statue of Crash Bandicoot from the Crash Bandicoot series. It is a 1:1 scale replica of the character, and is made of plastic.",
      "Playstation",
      49.99
    )
    const coll3 = new createCol(
      "Master Chief Statue",
      "This is a statue of Master Chief from the Halo series. It is a 1:1 scale replica of the character, and is made of plastic.",
      "Xbox",
      49.99
    )

    const coll4 = new createCol(
      "Mario Plush",
      "This is a plush of Mario from the Super Mario Bros. series. It is a 1:1 scale replica of the character, and is made of fabric.",
      "N64",
      19.99
    )

    const coll5 = new createCol(
      "Crash Bandicoot Plush",
      "This is a plush of Crash Bandicoot from the Crash Bandicoot series. It is a 1:1 scale replica of the character, and is made of fabric.",
      "Playstation",
      19.99
    )

    const coll6 = new createCol(
      "Master Chief Plush",
      "This is a plush of Master Chief from the Halo series. It is a 1:1 scale replica of the character, and is made of fabric.",
      "Xbox",
      19.99
    )

    const collectibles = [coll1, coll2, coll3, coll4, coll5, coll6];
    const createdCollectibles = await Promise.all(collectibles.map(collectible =>  Collectibles.createCollectibleListing(collectible)));
    console.log("Initial Collectibles Created")

    //***** INITIAL ACCESSORIES ***** */
    console.log("Creating Initial Accessories")

    class createAcc {
      constructor(title, desc, console, price, image) {
        this.title = title,
        this.description = desc,
        this.console = console,
        this.price = price,
        this.image = image
      }
    }

    const acc1 = new createAcc(
      "Nintendo 64 Controller",
      "The Nintendo 64 controller is the standard game controller included with the Nintendo 64 video game console. It was released in Japan on June 23, 1996, in North America on September 29, 1996, and in Europe on March 29, 1997.",
      "N64",
      26.99
    )
    const acc2 = new createAcc(
      "Playstation Controller",
      "The DualShock is the first gamepad to feature force feedback, which was originally developed by Immersion Corporation. The DualShock was the first gamepad to feature an analog stick, which was originally developed by Sega for the Saturn.",
      "Playstation",
      18.99
    )
    const acc3 = new createAcc(
      "Xbox Controller",
      "The Xbox controller is the primary game controller for the Xbox video game console, also known as the Xbox OG, and was introduced at the Game Developers Conference on May 12, 2000.",
      "Xbox",
      19.99
    )

    const acc4 = new createAcc(
      "Nintendo 64 Memory Card",
      "The Nintendo 64 Memory Card is a removable memory card for the Nintendo 64 video game console. It was released in Japan on June 23, 1996, in North America on September 29, 1996, and in Europe on March 29, 1997.",
      "N64",
      9.99
    )

    const acc5 = new createAcc(
      "Playstation Memory Card",
      "The PlayStation Memory Card is a removable memory card for the PlayStation video game console. It was released in Japan on December 3, 1997, in North America on March 3, 1998, and in Europe on March 27, 1998.",
      "Playstation",
      9.99
    )

    const acc6 = new createAcc(
      "Xbox Memory Card",
      "The Xbox Memory Card is a removable memory card for the Xbox video game console. It was released in Japan on November 22, 2001, in North America on November 15, 2001, and in Europe on November 23, 2001.",
      "Xbox",
      9.99
    )

    const accessories = [acc1, acc2, acc3, acc4, acc5, acc6];
    const createdAccessories = await Promise.all(accessories.map(accessory =>  Acc.createAccessoryListing(accessory)))
    console.log("Initial Accessories Created")

    //***** INITIAL ORDERS ***** */
    console.log("Creating Initial Fake Orders")

    class createOr {
      constructor(userId, status) {
        this.userId = userId,
        this.status = status
      }
    }

    const order1 = new createOr(
      1,
      "Success"
    )
    const order2 = new createOr(
      2,
      "Pending"
    )
    const order3 = new createOr(
      3,
      "Pending"
    )

    const orders = [order1, order2, order3];
    const createdOrders = await Promise.all(orders.map(order =>  Orders.createOrder(order)))
    console.log("Initial Fake Orders Created")

    //***** INITIAL CART ***** */
    console.log("Creating Initial Fake Carts")

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

    const cart1 = new createCart(
      1,
      1,
      1,
      null,
      null,
      null,
      1
    )
    const cart2 = new createCart(
      2,
      1,
      2,
      2,
      null,
      null,
      null
    )
    const cart3 = new createCart(
      3,
      1,
      3,
      null,
      3,
      null,
      1
    )

    const carts = [cart1, cart2, cart3];
    const createdCarts = await Promise.all(carts.map(cart =>  Cart.addItemToCart(cart)))
    console.log("Initial Fake Carts Created")

  } catch (error) {
    throw error;
  }
}

dropTables()
.then(buildTables)
.then(populateInitialData)
.catch(console.error)
.finally(() => client.end());
