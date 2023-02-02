const BASEURL = 'https://retro-r-us.onrender.com/api';

export {} from "./accessories";
export {} from "./collectibles";
export {} from "./games"
export {} from "./consoles"
export {} from "./orders"
export { addItemToCart, getOrderById, updateCart, destroyCart } from "./cart"
export { getCurrentUser, updateUserPass, userAction, isAdmin } from "./users"
export {} from "./admin"

export default BASEURL;
