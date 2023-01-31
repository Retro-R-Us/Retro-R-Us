const client = require('../client');


async function getAllGames() {
    const { rows: games } = await client.query(`
        SELECT * FROM games;
    `);

    return games;
}


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


async function updateGameListing(gameId, { title, description, console, year, price }) {
    
    try {
        const { rows: [game] } = await client.query(`
            UPDATE accessories
            SET title=$1, description=$2, console=$3, year=$4, price=$5
            WHERE "gameId"=$6
            RETURNING *;
        `, [title, description, console, year, price, gameId]);
        
        return game;
    } catch (error) {
        throw error;
    }
}


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
