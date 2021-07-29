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

export const getNewVariantCartItem = (product, variant) => {
    let cartItem = {}
    if (product && variant) {
        cartItem = {
            qty: 0,
            weight: variant.weight,
            unit: variant.unit,
            price: variant.price,
            discount_price: variant.discount_price,
            product_id: product.id,
            displayWeight: variant.weight + " " + variant.unit
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

export const getVariantCartItem = (cartItems, product, variant) => {
    // const product = getProductById(id);
    if (!product) return {}

    let initialCartItem = getNewVariantCartItem(product, variant);

    if (!cartItems) return initialCartItem;
    const items = cartItems.find(item => (item.product_id == product.id && item.displayWeight == variant?.displayWeight)) || initialCartItem;
    // console.log("getting cart item : ", items);
    return items;
}

export const getCartItemById = (cartItems, product_id, displayWeight) => {
    // const product = getProductById(id);

    const item = cartItems.find(item => (item.product_id == product_id && item.displayWeight == displayWeight));

    return item;
}

export const getProductCount = (cartItems, product) => {
    return cartItems.filter(item => item.product_id == product.id).reduce((total, item) => total + item.qty, 0);
}

