import { createStore, applyMiddleware } from 'redux';
import {
    ASYNC_START,
    ASYNC_END,
    APP_LOADING,
    APP_LOADED,
    LOGOUT,
    LOGIN,
    CART_PRODUCT_UPDATED,
    CART_COUPON_APPLIED,
    CART_TAX_APPLIED,
    CART_PRODUCT_REMOVED,
    CART_PRODUCT_ADDED,
    CART_CLEARED,
    ADDRESS_SAVED,
    ADDRESS_LOADED,
    REGISTER,
    OTP_REQUEST,
    ADDRESS_UPDATED,
    ADDRESS_DELETED,
    CART_ITEMS_LOADED,
    ADDRESS_SELECTED,
    ORDER_SUCCESS,
    APP_SETTINGS_LOADED,
    SEND_ENQUIRY,
    ORDER_CANCELLED

} from './actions/types';
import { initAuth, fetchUser, register, logout } from "../redux/actions/auth";
import { fetchAddressList, verifyPincode } from "../redux/actions/address";
import { fetchCartItems, fetchTax } from "../redux/actions/cart";
import lazyLoad from "./actions/lazyLoad";
import { selectDeliveryAddress, removeDeliveryAddress, fetchAppSettings, fetchDeliveryAreas, fetchEnquiryList } from "./actions/app";
import { evaluateCart } from "../redux/actions/cart";
import rootReducer from './reducers/index';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import agent from "../agent";
// import thunk from 'redux-thunk';
// import Toast from 'react-native-toast-message';
import { fetchOrders } from './actions/order';
import { fetchCategories } from './actions/home';

const promiseMiddleware = store => next => action => {
    console.log(action)
    if (isPromise(action.payload)) {
        if (!action.lazyLoad) store.dispatch({ type: ASYNC_START, subtype: action.type });

        return action.payload.then(
            res => {
                console.log('RESULT', res);
                if (parseInt(res.status) === 0) {
                    action.error = true;
                    action.payload = res.message || res.errors;
                    // Toast.show({
                    //     type: 'error',
                    //     text1: 'API Error',
                    //     text2: action.payload.toString()
                    // });
                } else {
                    action.payload = res.data || res;
                }
                if (!action.lazyLoad) store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            },
            error => {
                // Toast.show({
                //     type: 'error',
                //     text1: 'API Error',
                //     text2: error.response.body.message || error.response.body.toString()
                // });
                console.log('ERROR', error);
                if (!action.lazyLoad) store.dispatch({ type: ASYNC_END, promise: action.payload });

                if (error.response?.status == 401) {
                    console.log("Unauthorized Access. Logging Out.");
                    store.dispatch(logout());
                } else {
                    action.error = true;
                    action.payload = error.response?.body;
                    // console.log(error.response);
                    store.dispatch(action);
                }


            }
        );
    }

    next(action);
};

const appInitMiddleware = store => next => action => {

    if (action.type == APP_LOADING) {
        console.log('Initializing App');
        store.dispatch(lazyLoad(fetchAppSettings()));
        store.dispatch(lazyLoad(fetchCategories()));
        const token = localStorage.getItem('token');

        console.log("Token: " + token);
        if (token !== null) {
            // token = token + "a";
            store.dispatch(initAuth(token));
            agent.setToken(token);
            store.dispatch(fetchUser());
            store.dispatch(lazyLoad(fetchAddressList()));
            store.dispatch(lazyLoad(fetchCartItems()));
            store.dispatch(lazyLoad(fetchDeliveryAreas()));

            // try {
            //     AsyncStorage.getItem('delivery_address')
            //         .then((address) => { if (address) store.dispatch(selectDeliveryAddress(JSON.parse(address))) })
            // }
            // catch (e) {
            //     console.log(e);
            // }
            store.dispatch({ type: APP_LOADED });
        } else {
            store.dispatch({ type: APP_LOADED })
        }

    }

    next(action);
};

const loginMiddleware = store => next => action => {
    if (action.type == OTP_REQUEST && action.error) {
        console.log("OTP Failed. Need to register.")
        const mobile = store.getState().auth.mobile;
        console.log(mobile);
        store.dispatch(register(mobile));
    }
    else if (action.type === LOGIN) {
        if (!action.error) {
            try {
                console.log("Setting Token after logging in.");
                localStorage.setItem('token', action.payload.token);
                agent.setToken(action.payload.token);
                // store.dispatch(fetchUser(action.payload.response.data.id));
                // agent.setUserId(action.payload.response.data.id);
                store.dispatch(lazyLoad(fetchAddressList()));
                store.dispatch(lazyLoad(fetchCartItems()));
                store.dispatch(lazyLoad(fetchDeliveryAreas()));
                // store.dispatch(lazyLoad(fetchAppSettings()));
            } catch (e) {
                console.log(e);
            }
        }

    } else if (action.type === LOGOUT) {
        try {
            localStorage.removeItem('token');
        } catch (e) {
            console.log(e);
        }
    }

    next(action);
};

const cartMiddleware = store => next => action => {
    if (action.type && !isPromise(action.payload) && (action.type == CART_COUPON_APPLIED ||
        action.type == CART_TAX_APPLIED || action.type == CART_ITEMS_LOADED || action.type == APP_SETTINGS_LOADED)) {

        console.log(store.getState().cart);

        // store.dispatch(lazyLoad(fetchTax()));

        next(action);

        const cart = store.getState().cart;
        const categories = store.getState().home.categories;
        const settings = store.getState().app.settings;
        console.log(cart);

        store.dispatch(evaluateCart(cart, categories, settings));

    }
    if (action.type && !isPromise(action.payload) && (
        action.type == CART_CLEARED || action.type == CART_PRODUCT_REMOVED ||
        action.type == CART_PRODUCT_ADDED || action.type == CART_PRODUCT_UPDATED)) {

        //console.log(store.getState().cart);


        store.dispatch(fetchCartItems()).then(() => next(action));




        // const cart = store.getState().cart;
        // const categories = store.getState().home.categories;
        // console.log(cart);

        // store.dispatch(evaluateCart(cart, categories));

    }
    if (action.type && !isPromise(action.payload) && (
        action.type == ORDER_SUCCESS)) {

        //console.log(store.getState().cart);

        if (!action.error)
            store.dispatch(fetchCartItems()).then(next(action));
        else {
            next(action);
        }




        // const cart = store.getState().cart;
        // const categories = store.getState().home.categories;
        // console.log(cart);

        // store.dispatch(evaluateCart(cart, categories));

    }
    else {
        next(action);
    }
};

const deliveryAddressMiddleware = store => next => action => {
    if (action.type && !isPromise(action.payload) && (action.type == ADDRESS_SAVED || action.type == ADDRESS_UPDATED || action.type == ADDRESS_DELETED)) {
        // const deliveryAddress = action.payload;
        // console.log(deliveryAddress);
        // if (deliveryAddress)
        //     store.dispatch(selectDeliveryAddress({ id: deliveryAddress.address_id }));

        store.dispatch(lazyLoad(fetchAddressList()));

    }
    else if (action.type && !isPromise(action.payload) && (action.type == ADDRESS_SELECTED)) {
        // const deliveryAddress = action.payload;
        // console.log(deliveryAddress);
        // if (deliveryAddress)
        //     store.dispatch(selectDeliveryAddress({ id: deliveryAddress.address_id }));
        const pincode = action.payload.pincode;
        store.dispatch(lazyLoad(verifyPincode(pincode)));

    }
    else if (action.type && !isPromise(action.payload) && (action.type == ADDRESS_LOADED)) {
        const addresses = action.payload || [];

        // if (!addresses || addresses.length == 0) {
        //     store.dispatch(removeDeliveryAddress());
        // }
        // const existing = store.getState().app.address || {};
        // const deliveryAddress = addresses.find(address => address.address_id == existing.id)

        // if (deliveryAddress) {
        //     store.dispatch(selectDeliveryAddress(deliveryAddress));
        // }
        // else {
        //     const default_address = addresses.find(address => address.default_address);
        //     if (default_address) {
        //         store.dispatch(selectDeliveryAddress(default_address));
        //     }
        // }
        const default_address = addresses.find(address => address.default_address);
        if (default_address) {
            store.dispatch(selectDeliveryAddress(default_address));
        }

    }

    next(action);

};

const enquiryMiddleware = store => next => action => {
    if (action.type == SEND_ENQUIRY && !action.error) {
        store.dispatch(fetchEnquiryList());
    }

    next(action);
};

const orderMiddleware = store => next => action => {
    if ((action.type == ORDER_CANCELLED || action.type == ORDER_SUCCESS) && !action.error) {
        store.dispatch(fetchOrders());
    }

    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}
const store = createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware,
        appInitMiddleware,
        loginMiddleware,
        cartMiddleware,
        deliveryAddressMiddleware,
        enquiryMiddleware,
        orderMiddleware)
);


export default store;