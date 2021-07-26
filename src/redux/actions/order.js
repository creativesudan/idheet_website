import { ORDERS_LOADED, ORDER_CANCELLED, ORDER_PLACED_CLEARED, SINGLE_ORDER_LOADED } from "./types";
import agent from "../../agent";

export const fetchOrders = () => {
    return {
        type: ORDERS_LOADED,
        payload: agent.Order.all()
    }
}

export const cancelOrderItem = (orderId) => {
    return {
        type: ORDER_CANCELLED,
        payload: agent.Order.cancel(orderId)
    }
}


export const cancelCompleteOrder = (orderId) => {
    return {
        type: ORDER_CANCELLED,
        payload: agent.Order.cancelOrder(orderId)
    }
}


export const clearOrderPlaced = () => {
    return {
        type: ORDER_PLACED_CLEARED
    }
}

export const fetchOrderById = (orderId) => {
    return {
        type: SINGLE_ORDER_LOADED,
        payload: agent.Order.getOrderById(orderId)
    }
}
