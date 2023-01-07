const client = require("./client");

async function getAllConsoles() {
    try {
        const { rows: consoles } = await client.query(`
        SELECT * FROM consoles;
        `);
        return consoles;
    } catch(error) {
        throw error;
    }
};

async function getConsolesById(id) {
    try {
        const {
            rows: [consoles],
        } = await client.query(`
        SELECT * FROM consoles
        WHERE id=$1;
        `,
        [id]
        );
        if (!consoles) {
            return undefined;
        }
        return consoles;
    }  catch(error) {
        throw error;
    }
};



