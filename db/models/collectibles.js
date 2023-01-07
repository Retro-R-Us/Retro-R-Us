const client = require("./client");

module.exports = {
    getAllCollectibles,
    getCollectiblesById,
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


