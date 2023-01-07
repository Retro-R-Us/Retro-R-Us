const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllGames,
    getGameById
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
