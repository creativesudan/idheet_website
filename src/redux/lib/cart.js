import React from "react";
import { useSelector } from "react-redux";

export const getNewCartItem = (product) => {
    let cartItem = {}
    if (product && product.selectedVariant) {
        cartItem = {
            qty: 0,
            weight: product.selectedVariant.weight,
            unit: product.selectedVariant.unit,
            price: product.selectedVariant.price,
            discount_price: product.selectedVariant.discount_price,
            product_id: product.id,
            displayWeight: product.selectedVariant.weight + " " + product.selectedVariant.unit
        };
    }
    return cartItem;
}

export const getDefaultCartItem = (product) => {
    let cartItem = {}
    if (product && product.selectedVariant) {
        cartItem = {
            qty: 0,
            weight: product.selectedVariant.weight,
            unit: product.selectedVariant.unit,
            price: product.selectedVariant.price,
            discount_price: product.selectedVariant.discount_price,
            product_id: product.id,
            displayWeight: product.selectedVariant.weight + " " + product.selectedVariant.unit
        };
    }
    return cartItem;
}

export const getCartItem = (cartItems, product) => {
    // const product = getProductById(id);
    if (!product) return {}

    let initialCartItem = getNewCartItem(product);

    if (!cartItems) return initialCartItem;
    const items = cartItems.find(item => item.product_id == product.id) || initialCartItem;
    // console.log("getting cart item : ", items);
    return items;
}

export const getProductCount = (cartItems, product) => {
    return cartItems.filter(item => item.product_id == product.id).reduce((total, item) => total + item.qty, 0);
}

