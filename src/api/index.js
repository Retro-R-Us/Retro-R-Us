const BASEURL = process.env.APIURL;

import axios from 'axios';

export {} from "./accessories";
export {} from "./collectibles";
export {} from "./games"
export {} from "./consoles"
export {} from "./orders"
export { addItemToCart, getOrderById, updateCart, destroyCart } from "./cart"
export { getCurrentUser, updateUserPass, userAction, isAdmin } from "./users"
export {} from "./admin"

export async function getAPIHealth() {
    try {
        const { data } = await axios.get("/api/health");
        return data;
    } catch (err) {
        console.error(err);
        return { healthy: false };
    }
}
console.log("APIURL", BASEURL)
export default BASEURL;
