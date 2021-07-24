import {
    CATEGORY_LOADED,
    PRODUCTS_LOADED,
    ALL_PRODUCTS_LOADED,
    SLIDER_IMAGES_LOADED,
    LISTING_VIEW_PRODUCTS_LOADED,
    RECOMMENDED_PRODUCTS_LOADED,
    EXCLUSIVE_PRODUCTS_LOADED,
    APP_SETTINGS_LOADED,
    POPULAR_PRODUCTS_LOADED,
    BRANDS_LOADED,
    BRAND_PRODUCTS_LOADED,
    SUBCATEGORIES_LOADED,
    OTHER_PRODUCTS_LOADED,
    PRODUCTS_LOADING_START,
    ASYNC_START,
    SINGLE_PRODUCT_LOADED
} from "../actions/types";


export default function (state = {}, action) {


    switch (action.type) {
        case CATEGORY_LOADED:
            if (action.error) {
                return { ...state, categories: [] };
            }

            return {
                ...state,
                categories: action.payload
            }
        case ASYNC_START:
            if (action.subtype == PRODUCTS_LOADED) {
                return {
                    ...state,
                    productsLoading: true
                }
            }
            if (action.subtype == BRAND_PRODUCTS_LOADED) {
                return {
                    ...state,
                    brandProductsLoading: true
                }
            }

            return state;
        case PRODUCTS_LOADED:
            if (action.error) {
                return { ...state, products: [] };
            }

            return {
                ...state,
                products: productModel(action.payload),
                productsLoading: false
            }
        case ALL_PRODUCTS_LOADED:

            return {
                ...state,
                allProducts: action.payload
            }

        case SINGLE_PRODUCT_LOADED:

            return {
                ...state,
                activeProduct: singleProductModel(action.payload)
            }
        case SLIDER_IMAGES_LOADED:

            return {
                ...state,
                sliderImages: action.payload
            }

        case EXCLUSIVE_PRODUCTS_LOADED:
            if (action.error) {
                return { ...state, exclusiveProducts: [] };
            }
            return {
                ...state,
                exclusiveProducts: productModel(action.payload.map(product => product.products))
            }

        case POPULAR_PRODUCTS_LOADED:
            if (action.error) {
                return { ...state, popularProducts: [] };
            }

            return {
                ...state,
                popularProducts: productModel(action.payload.map(product => product.products))
            }

        case OTHER_PRODUCTS_LOADED:
            if (action.error) {
                return { ...state, otherProducts: [] };
            }

            return {
                ...state,
                otherProducts: productModel(action.payload.map(product => product.products))
            }

        case RECOMMENDED_PRODUCTS_LOADED:
            if (action.error) {
                return { ...state, recommendedProducts: [] };
            }

            return {
                ...state,
                recommendedProducts: productModel(action.payload)
            }

        case APP_SETTINGS_LOADED:
            return {
                ...state,
                default_image: action.payload?.default_product_image
            }

        case BRANDS_LOADED:
            if (action.error) {
                return { ...state, brands: [] };
            }
            return {
                ...state,
                brands: action.payload
            }

        case BRAND_PRODUCTS_LOADED:
            if (action.error) {
                return { ...state, brandProducts: [] };
            }
            return {
                ...state,
                brandProducts: productModel(action.payload.products),
                brandProductsLoading: false
            }

        case SUBCATEGORIES_LOADED:
            if (action.error) {
                return { ...state, subCategories: [] };
            }
            return {
                ...state,
                subCategories: action.payload.category
            }

        default:
            return state;
    }

}
export const getDefaultImage = (images) => {
    if (!images || images.length == 0) {
        return ""
    }
    const image = images.find(image => image.default);

    if (image) return image.image;
    return images[0].image;
}

const getDefaultVariant = (variants) => {
    if (!variants || variants.length == 0) {
        return null;
    }
    const variant = variants.find(variant => variant.default);

    if (variant) return variant;
    return variants[0];
}

function variantModel(variants) {
    let objects = [];
    if (variants) {
        variants.map(variant => objects.push({
            ...variant,
            displayWeight: variant.weight + " " + variant.unit,
            discountedPrice: variant.price - variant.discount_price,
            discountPercentage: parseInt((variant.discount_price / variant.price) * 100)
        }));
    }
    return objects;
}
export function singleProductModel(product) {
    const variants = variantModel(product.prices);
    const defaultVariant = getDefaultVariant(variants);
    return {
        ...product,
        variants: variants,
        defaultVariant: defaultVariant,
        selectedVariant: defaultVariant,
        price: defaultVariant ? defaultVariant.price : "",
        discountedPrice: defaultVariant ? defaultVariant.price - defaultVariant.discount_price : "",
        displayWeight: defaultVariant ? defaultVariant.displayWeight : "",
        discountPercentage: defaultVariant ? defaultVariant.discountPercentage : "",
        image: getDefaultImage(product.images)
    }
}
export function productModel(products) {
    let objects = [];
    if (products) {
        products.map(product => {
            objects.push(singleProductModel(product))
        });
    }
    return objects;
}

