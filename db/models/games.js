const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllGames,
    getGameById,
    getGamesByConsole,
    getGamesByYear,
    createGameListing
};

// get all games
async function getAllGames() {
    const { rows: [games] } = await client.query(`
        SELECT * FROM games;
    `);

    return games;
}

// get game by ID
async function getGameById(gameId) {
    try {
        const { rows: [game] } = await client.query(`
            SELECT * FROM games
            WHERE "gameId"=$1;
        `, [gameId]);

        if (!game) {
            throw {
                name: 'ErrorGameNotFound',
                message: 'Could not find a game by that gameId'
            };
        }

        return game;
    } catch (error) {
        throw error;
    }
}

// get all games by console
async function getGamesByConsole(console) {
    try {
        const { rows: [games] } = await client.query(`
            SELECT * FROM games
            WHERE console=$1;
        `, [console]);

        if (!games) {
            throw {
                name: 'ErrorGamesNotFound',
                message: 'Could not find any games by that console'
            };
        }

        return games;
    } catch (error) {
        throw error;
    }
}

// get all games by year
async function getGamesByYear(year) {
    try {
        const { rows: [games] } = await client.query(`
            SELECT * from games
            WHERE year=$1;
        `, [year]);

        if (!games) {
            throw {
                name: 'ErrorGamesNotFound',
                message: 'Could not find any games by that year'
            }
        }

        return games;
    } catch (error) {
        throw error;
    }
}

// create new game listing
async function createGameListing({ title, description, console, year, price }) {
    try {
        const { rows: [game] } = await client.query(`
            INSERT INTO games(title, description, console, year, price)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `, [title, description, console, year, price]);

        return game;
    } catch (error) {
        throw error;
    }
}