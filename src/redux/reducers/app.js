import {
    APP_LOADED,
    APP_LOADING,
    ASYNC_END,
    ASYNC_START,
    ADDRESS_SELECTED,
    DELIVERY_ADDRESS_REMOVED,
    PINCODE_VERIFIED,
    DELIVERY_SLOTS_LOADED,
    DELIVERY_SLOT_SELECTED,
    LOGOUT,
    APP_SETTINGS_LOADED,
    SEND_ENQUIRY,
    DELIVERY_AREAS_LOADED,
    DELIVERY_AREA_SELECTED,
    ENQUIRY_LIST_LOADED,
    CMS_LIST_LOADED,
    SET_DEVICE_TOKEN,
    SET_PAYMENT_TYPE
} from "../actions/types";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from "react-native-toast-message";


export default function (state = { siteLoading: true }, action) {
    if (action.error) {
        return state;
    }
    switch (action.type) {
        case APP_LOADING:
            return {
                ...state,
                showInitScreen: true
            }
        case APP_LOADED:
            return {
                ...state,
                showInitScreen: false,
                siteLoading: false
            }
        case ASYNC_START:
            return {
                ...state,
                inProgress: state.inProgress && state.inProgress > 0 ? state.inProgress + 1 : 1
            }
        case ASYNC_END:
            return {
                ...state,
                inProgress: state.inProgress && state.inProgress > 0 ? state.inProgress - 1 : 0
            }
        case ADDRESS_SELECTED:
            return {
                ...state,
                address: action.payload
            }
        case DELIVERY_ADDRESS_REMOVED:
            return {
                ...state,
                address: null
            }
        case PINCODE_VERIFIED:
            if (action.error) {
                return state;
            }
            return {
                ...state,
                address: { ...state.address, area: action.payload.area, area_id: action.payload.area_id },
                selected_area: { area: action.payload.area, area_id: action.payload.area_id }
            }

        case DELIVERY_AREAS_LOADED:
            if (action.error) {
                return state;
            }
            return {
                ...state,
                areas: action.payload
            }

        case DELIVERY_AREA_SELECTED:
            if (action.error) {
                return state;
            }
            return {
                ...state,
                selected_area: action.payload
            }

        case DELIVERY_SLOTS_LOADED:
            return {
                ...state,
                deliverySlots: action.payload
            }

        case DELIVERY_SLOT_SELECTED:
            return {
                ...state,
                selectedDeliverySlot: action.payload
            }
        case LOGOUT:
            return {};

        case APP_SETTINGS_LOADED:
            return {
                ...state,
                settings: action.payload
            }

        case SEND_ENQUIRY:
            if (action.error) {
                // Toast.show({
                //     type: 'error',
                //     text1: 'Enquiry Error',
                //     text2: action.payload.message
                // });
            } else {
                // Toast.show({
                //     type: 'success',
                //     text1: action.payload.message
                // });
            }

        case ENQUIRY_LIST_LOADED:
            if (action.error) {
                return state;
            }
            return {
                ...state,
                enquiryList: action.payload
            }

        case CMS_LIST_LOADED:
            if (action.error) {
                return state;
            }
            return {
                ...state,
                cmsList: action.payload
            }

        case SET_DEVICE_TOKEN:
            return {
                ...state,
                deviceToken: action.payload
            }
        case SET_PAYMENT_TYPE:
            return {
                ...state,
                paymentType: action.payload
            }
        default:
            return state;
    }
}