import { combineReducers } from "redux";
import auth from "./auth";
import home from "./home";
import app from "./app";
import address from "./address";
import cart from "./cart";
import order from "./order";
import search from "./search";

export default combineReducers({
    auth,
    home,
    app,
    address,
    cart,
    order,
    search
});