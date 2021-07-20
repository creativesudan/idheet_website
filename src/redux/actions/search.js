import { SEARCH_BRAND, SEARCH_CATEGORY, SEARCH_PRODUCT, SEARCH_RESET } from "./types";
import agent from "../../agent";

export const searchProduct = (name) => {
    return {
        type: SEARCH_PRODUCT,
        payload: agent.Search.product(name),
        lazyLoad: true
    }
}

export const searchCategory = (name) => {
    return {
        type: SEARCH_CATEGORY,
        payload: agent.Search.category(name),
        lazyLoad: true
    }
}

export const searchBrand = (name) => {
    return {
        type: SEARCH_BRAND,
        payload: agent.Search.brand(name),
        lazyLoad: true
    }
}


export const searchReset = () => {
    return {
        type: SEARCH_RESET
    }
}