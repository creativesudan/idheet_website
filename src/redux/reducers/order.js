// import Toast from "react-native-toast-message";
import {
    ORDER_SUCCESS,
    ORDERS_LOADED,
    ORDER_PLACED_CLEARED,
    SINGLE_ORDER_LOADED
} from "../actions/types";


export default function (state = { orders: [], newOrder: {} }, action) {
    switch (action.type) {
        case ORDER_SUCCESS:
            if (action.error) {
                // Toast.show({
                //     type: 'error',
                //     text1: 'Order Error',
                //     text2: 'Contact Us if your payment got deducted.'
                // });
                return {
                    ...state,
                    orderSuccess: false
                }
            }
            const newOrder = action.payload;
            return {
                ...state,
                newOrder: newOrder,
                orders: [newOrder, ...state.orders],
                orderSuccess: true
            }
        case ORDERS_LOADED:
            if (action.error) {
                return state;
            }
            return {
                ...state,
                orders: orderModel(action.payload)
            }
        case ORDER_PLACED_CLEARED:
            return {
                ...state,
                newOrder: {},
                orderSuccess: null
            }
        case SINGLE_ORDER_LOADED:
            if (action.error) {
                return {
                    ...state,
                    activeOrder: null
                }
            }
            return {
                ...state,
                activeOrder: SingleOrderModel(action.payload)
            }

        default:
            return state;
    }
}




export function OrderProductModel(products) {
    let objects = [];
    if (products) {
        products.map(product => {
            // const variants = variantModel(product.prices);
            objects.push({
                ...product,
                name: product.product_name,
                displayWeight: product.weight + " " + product.unit,
                discountedPrice: product.price - product.discount_price
            })
        });
    }
    return objects;
}

export function SingleOrderModel(order) {
    return {
        ...order,
        // displayDate: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ", " + date.toLocaleTimeString(),
        displayDate: order.created_at,
        items: OrderProductModel(order.order_items)
    }
}

export function orderModel(orders) {
    let objects = [];
    if (orders) {
        orders.map(order => {
            objects.push({
                ...order,
                // displayDate: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ", " + date.toLocaleTimeString(),
                displayDate: order.created_at,
                items: OrderProductModel(order.order_items)
            })
        });
    }
    return objects;
}