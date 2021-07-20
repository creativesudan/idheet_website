import {
    SEARCH_PRODUCT,
    SEARCH_CATEGORY,
    SEARCH_RESET,
    SEARCH_BRAND
} from "../actions/types";
import { productModel } from "./home";

const initial_state = { products: [], categories: [] };

export default function (state = initial_state, action) {
    switch (action.type) {
        case SEARCH_CATEGORY:
            if (action.error) {
                return {
                    ...state,
                    categories: []
                }
            }
            return {
                ...state,
                categories: action.payload
            }
        case SEARCH_PRODUCT:
            if (action.error) {
                return {
                    ...state,
                    products: []
                }
            }
            return {
                ...state,
                products: productModel(action.payload)
            }

        case SEARCH_BRAND:
            if (action.error) {
                return {
                    ...state,
                    brands: []
                }
            }
            return {
                ...state,
                brands: [action.payload]
            }

        case SEARCH_RESET:
            return initial_state

        default:
            return state;
    }
}