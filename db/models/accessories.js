const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllAccessories,
};

// get all accessories
async function getAllAccessories() {
    const { rows: [accessories] } = await client.query(`
        SELECT * FROM accessories;
    `);

    return accessories;
}


// get accessory by id

// get accessories by console

// create accessory listing

// delete accessory listing