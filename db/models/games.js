const client = require('../client');

// returns all games
async function getAllGames() {
    const { rows: [games] } = await client.query(`
        SELECT * FROM games;
    `);

    return games;
}

// returns game by id
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

// returns all games by console
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

// returns all games by year
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

// update game listing
async function updateGameListing(gameId, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [game] } = await client.query(`
            UPDATE games
            SET ${setString}
            WHERE "gameId"=${gameId}
            RETURNING *;
        `, Object.values(fields));

        return game;
    } catch (error) {
        throw error;
    }
}

// delete game listing
async function deleteGameListing(gameId) {
    try {
        const { rows: [game] } = await client.query(`
            DELETE FROM games
            WHERE "gameId"=$1
            RETURNING *;
        `, [gameId]);

        return game;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllGames,
    getGameById,
    getGamesByConsole,
    getGamesByYear,
    createGameListing,
    updateGameListing,
    deleteGameListing
};
