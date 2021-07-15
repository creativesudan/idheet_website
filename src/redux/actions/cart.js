import {
    CART_COUPONS_LOADED,
    CART_COUPON_APPLIED,
    CART_TAX_APPLIED,
    CART_EVALUATED,
    ORDER_SUCCESS,
    CART_CLEARED,
    CART_PRODUCT_UPDATED,
    CART_ITEMS_LOADED,
    CART_PRODUCT_ADDED,
    CART_PRODUCT_REMOVED
} from "./types";
import agent from "../../agent";

export const fetchCoupons = () => {
    return {
        type: CART_COUPONS_LOADED,
        payload: agent.Cart.coupons()
    }
}

export const fetchTax = () => {
    return {
        type: CART_TAX_APPLIED,
        payload: agent.Cart.tax()
    }
}

export const addCouponToCart = (coupon) => {
    return {
        type: CART_COUPON_APPLIED,
        payload: agent.Cart.verifyCoupon(coupon)
    }
}

export const codOrder = (orderId) => {
    return {
        type: ORDER_SUCCESS,
        payload: agent.Order.codOrder(orderId)
    }
}

export const order = (address, paymentType, delivery_shot_id, coupon_value, coupon = null, payment_id = null) => {
    return {
        type: ORDER_SUCCESS,
        payload: agent.Order.addOrder(address, paymentType, delivery_shot_id, coupon_value, coupon, payment_id)
    }
}

export const onlineOrder = (orderId, txnid, type = "ONLINE") => {
    return {
        type: ORDER_SUCCESS,
        payload: agent.Order.onlineOrder(orderId, txnid, type)
    }
}

export const removeFromCart = (item) => {
    return { type: "CART_PRODUCT_REMOVED", payload: item, item: item }
}

export const clearCart = () => {
    return {
        type: CART_CLEARED
    }
}

const getCategoryTax = (id, categories, tax_slabs) => {
    const category = categories.find(category => category.id == id);
    // if (category.tax in tax_slabs) {
    //     console.log("Tax for " + category.name);
    //     return parseInt(tax_slabs[category.tax]);
    // } else {
    //     return 0;
    // }
    if (category)
        return category.tax
    return 0;
}

const verifyAndApplyCoupon = (cart, priceTotal) => {
    // const coupon_start = Date.parse(cart.appliedCoupon.start_date);
    // const coupon_end = Date.parse(cart.appliedCoupon.end_date);
    // const today = new Date();
    let couponDiscount = 0;
    console.log("Evaluating coupon", cart.appliedCoupon);

    if (cart.appliedCoupon.type == "percent") {
        couponDiscount = priceTotal * (parseFloat(cart.appliedCoupon.value) / 100);
        couponDiscount = (couponDiscount > cart.appliedCoupon.capping_value) ? cart.appliedCoupon.capping_value : couponDiscount;
    }
    else if (cart.appliedCoupon.type == "fix")
        couponDiscount = parseFloat(cart.appliedCoupon.value);


    return couponDiscount;
}
export const evaluateCart = (cart, categories, settings) => {
    let mrpTotal = cart.items.reduce((total, obj) => parseFloat(obj.price) * parseInt(obj.qty) + total, 0);
    let priceTotal = cart.items.reduce((total, obj) => parseFloat(obj.total) + total, 0);
    let totalTax = 0;
    if (categories) {
        let tax_slabs = {};
        // cart.tax.filter(t => parseInt(t.status) == 1).map(t => { tax_slabs[t.id] = t.percentage });
        cart.items.map(item => {
            const tax = getCategoryTax(item.category_id, categories);
            console.log(tax);
            totalTax += item.total * (tax / 100);
        })
    }

    let discount = mrpTotal - priceTotal;

    let couponDiscount = 0;
    if (cart.appliedCoupon) {
        couponDiscount = verifyAndApplyCoupon(cart, priceTotal);
    }

    if (priceTotal < 0) priceTotal = 0;
    const deliveryCharge = settings ? parseInt(priceTotal) >= parseInt(settings.min_order_value_for_no_delivery) ? 0 : parseFloat(settings.delivery_charge) : 0;
    const total = priceTotal + totalTax - couponDiscount + deliveryCharge;
    if (total < 0) total = 0;
    return {
        type: CART_EVALUATED,
        payload: {
            subTotal: mrpTotal,
            priceTotal: priceTotal,
            totalDiscount: discount,
            coupon: cart.appliedCoupon,
            couponDiscount: couponDiscount,
            totalTax: totalTax,
            total: total,
            uniqueCount: cart.items.length,
            totalCount: cart.items.reduce((total, item) => parseInt(item.qty) + total, 0),
            orderAllowed: settings ? priceTotal >= parseFloat(settings.min_order_value) : false,
            deliveryCharge: deliveryCharge
        }
    }
}

export const addItem = (item) => {
    return {
        type: CART_PRODUCT_ADDED,
        payload: agent.Cart.addItem(item),
        item: item
    }
}

export const removeItem = (item) => {
    if (item.qty == 1) {
        return deleteItem(item.cart_id)
    }
    item.qty -= 1;
    return {
        type: CART_PRODUCT_UPDATED,
        payload: agent.Cart.updateItem(item.cart_id, item)
    }
}

export const deleteItem = (cart_id) => {
    return {
        type: CART_PRODUCT_REMOVED,
        payload: agent.Cart.deleteItem(cart_id)
    }
}

export const fetchCartItems = () => {
    return {
        type: CART_ITEMS_LOADED,
        payload: agent.Cart.all()
    }
}

export const updateItem = (cartItems, newItem) => {
    const cartItem = cartItems.find(item => item.product_id == newItem.product_id && item.displayWeight == newItem.displayWeight);
    if (cartItem) {
        cartItem.qty += newItem.qty;
        return {
            type: CART_PRODUCT_UPDATED,
            payload: agent.Cart.updateItem(cartItem.cart_id, cartItem)
        }
    }
    else {
        return addItem(newItem);
    }

}