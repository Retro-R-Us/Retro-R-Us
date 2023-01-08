const client = require("../client");

module.exports = {
    getAllCollectibles,
    getCollectibleById,
    getCollectiblesByConsole,
    createCollectibleListing,
};
async function getAllCollectibles() {
    const { rows: [collectibles] } = await client.query(`
        SELECT * FROM collectibles;
    `);

    return collectibles;
};

async function getCollectibleById(collectibleId) {
    try {
        const { rows: [collectibles] } = await client.query(`
            SELECT * FROM collectibles
            WHERE "collectibleId"=$1;
        `, [collectibleId]);

        if (!collectibles) {
            return undefined
        };

        return collectibles;
    } catch (error) {
        throw error;
    }
};

async function getCollectiblesByConsole(console) {
    try {
        const { rows: [collectibles] } = await client.query(`
            SELECT * FROM collectibles
            WHERE console=$1;
        `, [console]);

        if (!collectibles) {
            return undefined;
        }

        return collectibles;
    } catch (error) {
        throw error;
    }
};

async function createCollectibleListing({ title, description, console, price }) {
    try {
        const { rows: [collectibles] } = await client.query(`
            INSERT INTO collectible(title, description, console, price)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [title, description, console, price]);

        return collectibles;
    } catch (error) {
        throw error;
    }   
};


