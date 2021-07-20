import {
    CATEGORY_LOADED,
    PRODUCTS_LOADED,
    ALL_PRODUCTS_LOADED,
    SLIDER_IMAGES_LOADED,
    LISTING_VIEW_PRODUCTS_LOADED,
    EXCLUSIVE_PRODUCTS_LOADED,
    RECOMMENDED_PRODUCTS_LOADED,
    POPULAR_PRODUCTS_LOADED,
    BRAND_PRODUCTS_LOADED,
    BRANDS_LOADED,
    SUBCATEGORIES_LOADED,
    OTHER_PRODUCTS_LOADED,
    SINGLE_PRODUCT_LOADED
} from "./types";
import agent from "../../agent";

export const fetchCategories = () => {
    return {
        type: CATEGORY_LOADED,
        payload: agent.Category.all()
    }
}

export const fetchSubCategories = () => {
    return {
        type: SUBCATEGORIES_LOADED,
        payload: agent.Category.sub()
    }
}

export const fetchProducts = (categoryId) => {
    return {
        type: PRODUCTS_LOADED,
        payload: agent.Category.products(categoryId)
    }
}

export const fetchProductById = (productId) => {
    return {
        type: SINGLE_PRODUCT_LOADED,
        payload: agent.Category.product(productId)
    }
}

export const fetchAllProducts = () => {
    return {
        type: ALL_PRODUCTS_LOADED,
        payload: agent.Product.all()
    }
}

export const fetchSliderImages = () => {
    return {
        type: SLIDER_IMAGES_LOADED,
        payload: agent.SliderImages.all()
    }
}

export const loadListingViewProducts = (products) => {
    return {
        type: LISTING_VIEW_PRODUCTS_LOADED,
        payload: products
    }
}

export const fetchExclusiveProducts = () => {
    return {
        type: EXCLUSIVE_PRODUCTS_LOADED,
        payload: agent.Product.exclusiveProducts()
    }
}

export const fetchPopularProducts = () => {
    return {
        type: POPULAR_PRODUCTS_LOADED,
        payload: agent.Product.popularProducts()
    }
}

export const fetchOtherProducts = () => {
    return {
        type: OTHER_PRODUCTS_LOADED,
        payload: agent.Product.otherProducts()
    }
}

export const fetchRecommendedProducts = () => {
    return {
        type: RECOMMENDED_PRODUCTS_LOADED,
        payload: agent.Product.recommendedProducts()
    }
}

export const fetchBrandProducts = (brand_id) => {
    return {
        type: BRAND_PRODUCTS_LOADED,
        payload: agent.Category.brandProducts(brand_id)
    }
}

export const fetchBrands = () => {
    return {
        type: BRANDS_LOADED,
        payload: agent.Category.brands()
    }
}