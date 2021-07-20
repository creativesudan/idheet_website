import {
    CART_PRODUCT_ADDED,
    CART_PRODUCT_REMOVED,
    CART_PRODUCT_UPDATED,
    CART_COUPONS_LOADED,
    CART_COUPON_APPLIED,
    CART_TAX_APPLIED,
    CART_EVALUATED,
    CART_CLEARED,
    CART_ITEMS_LOADED
} from "../actions/types";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDefaultImage } from "./home";

const initialCart = {
    items: []
}
export default function (state = initialCart, action) {
    switch (action.type) {

        case CART_PRODUCT_REMOVED:
            // oldItems = [...state.items];
            // newItem = action.payload;
            // console.log("OOJJJOOO");
            // console.log(newItem);
            // console.log(state.items);
            // updated = false;
            // newItems = [...oldItems];

            // if (newItem.qty == 0) {
            //     console.log(newItem)
            //     newItems = state.items.filter(item => {
            //         if (item.id !== newItem.id && item.variant.weight !== newItem.variant.weight) {
            //             return true;
            //         }
            //         if (item.id === newItem.id && item.variant.weight !== newItem.variant.weight) {
            //             return true;
            //         }
            //         return false;

            //     });
            // }
            // else {
            //     newItems = oldItems.map(item => {
            //         if (item.id == newItem.id && item.variant.weight == newItem.variant.weight) {
            //             updated = true;
            //             return newItem;
            //         }
            //         return item;
            //     });


            //     if (!updated)
            //         newItems.unshift(newItem);

            // }
            // console.log("UPDATED!!!!!!!!!!!!!!!!!");
            // console.log(newItems);
            // return {
            //     ...state,
            //     items: newItems
            // }

            return state;

        case CART_CLEARED:
            return initialCart;

        case CART_PRODUCT_ADDED:
            // oldItems = [...state.items];
            // newItem = action.payload;
            // console.log("OOJJJOOO");
            // console.log(newItem);
            // console.log(state.items);
            // updated = false;
            // newItems = [...oldItems];

            // if (newItem.qty == 0) {
            //     newItems = state.items.filter(item => (item.id !== newItem.id && item.variant.weight !== newItem.vaiant.weight));
            // }
            // else {
            //     newItems = oldItems.map(item => {
            //         if (item.id == newItem.id && item.variant.weight == newItem.variant.weight) {
            //             item.qty += newItem.qty;
            //             updated = true;
            //         }
            //         return item;
            //     });


            //     if (!updated)
            //         newItems.unshift(newItem);

            // }
            // console.log("UPDATED!!!!!!!!!!!!!!!!!");
            // console.log(newItems);
            // return {
            //     ...state,
            //     items: newItems
            // }
            return state;

        case CART_COUPONS_LOADED:
            if (action.error) {
                return {
                    ...state,
                    coupons: []
                }
            }
            return {
                ...state,
                coupons: action.payload
            };

        case CART_COUPON_APPLIED:
            if (action.error) {
                return {
                    ...state,
                    appliedCoupon: { error: action.payload }
                }
            }
            return {
                ...state,
                appliedCoupon: action.payload
            };

        case CART_TAX_APPLIED:
            return {
                ...state,
                tax: action.payload
            };

        case CART_EVALUATED:
            return {
                ...state,
                ...action.payload
            };

        case CART_ITEMS_LOADED:
            if (action.error) {
                return initialCart;
            }

            const items = cartItemModel(action.payload);

            return {
                ...state,
                items: items
            };
        default:
            return state;
    }
}

function cartItemModel(items) {
    let objects = [];
    if (items) {
        items.map(item => objects.push({
            ...item,
            discountedPrice: item.price - item.price_discount,
            displayWeight: item.weight + " " + item.unit,
            discount_price: item.price_discount,
            discountPercentage: parseInt((item.price_discount / item.price) * 100),
            image: getDefaultImage(item.images)
        }))
    }
    return objects;
}

function evaluateCart(items, tax = null, coupon = null) {
    let cart = {
        total: items.reduce((total, item) => parseFloat(item.total) + total, 0),
        totalDiscount: items.reduce((total, item) => parseFloat(item.price_discount) + total, 0),
        uniqueCount: items.length,
        totalCount: items.reduce((total, item) => parseInt(item.qty) + total, 0)
    }


}