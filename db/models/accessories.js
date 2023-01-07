const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllAccessories,
    getAccessoryById,
    getAccessoriesByConsole
};

// get all accessories
async function getAllAccessories() {
    const { rows: [accessories] } = await client.query(`
        SELECT * FROM accessories;
    `);

    return accessories;
}

// get accessory by id
async function getAccessoryById(accessoryId) {
    try {
        const { rows: [accessory] } = await client.query(`
            SELECT * FROM accessories
            WHERE "accessoryId"=$1;
        `, [accessoryId]);

        if (!accessory) {
            throw {
                name: 'ErrorAccessoryNotFound',
                message: 'Could not find an accessory by that accessoryId'
            };
        }
    } catch (error) {
        throw error;
    }
}

// get accessories by console
async function getAccessoriesByConsole(console) {
    try {
        const { rows: [accessories] } = await client.query(`
            SELECT * FROM accessories
            WHERE console=$1;
        `, [console]);

        if (!accessories) {
            throw {
                name: 'ErrorAccessoriesNotFound',
                message: 'Could not find any accessories by that console'
            };
        }

        return accessories;
    } catch (error) {
        throw error;
    }
}

// create accessory listing

// delete accessory listing