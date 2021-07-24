import {
    ADDRESS_SELECTED,
    APP_SETTINGS_LOADED,
    CMS_LIST_LOADED,
    DELIVERY_ADDRESS_REMOVED,
    DELIVERY_AREAS_LOADED,
    DELIVERY_AREA_SELECTED,
    DELIVERY_SLOTS_LOADED,
    DELIVERY_SLOT_SELECTED,
    ENQUIRY_LIST_LOADED,
    SEND_ENQUIRY,
    SET_DEVICE_TOKEN,
    SET_PAYMENT_TYPE
} from "./types";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import agent from "../../agent";

export const selectDeliveryAddress = (address) => {
    // try {
    //     AsyncStorage.setItem("delivery_address", JSON.stringify(address));
    // } catch (e) {
    //     console.error(e);
    // }
    return {
        type: ADDRESS_SELECTED,
        payload: address
    }
}


export const removeDeliveryAddress = () => {
    try {
        localStorage.removeItem("delivery_address");
    } catch (e) {
        console.error(e);
    }
    return {
        type: DELIVERY_ADDRESS_REMOVED
    }
}

export const fetchDeliverySlots = () => {
    return {
        type: DELIVERY_SLOTS_LOADED,
        payload: agent.Cart.deliveryslots()
    }
}

export const selectDeliverySlot = (slot) => {
    return {
        type: DELIVERY_SLOT_SELECTED,
        payload: slot
    }
}

export const fetchAppSettings = () => {
    return {
        type: APP_SETTINGS_LOADED,
        payload: agent.App.settings()
    }
}

export const fetchDeliveryAreas = () => {
    return {
        type: DELIVERY_AREAS_LOADED,
        payload: agent.App.deliveryAreas()
    }
}

export const selectDeliveryArea = (area) => {
    return {
        type: DELIVERY_AREA_SELECTED,
        payload: area
    }
}

export const sendEnquiry = (enquire) => {
    return {
        type: SEND_ENQUIRY,
        payload: agent.App.enquiry(enquire)
    }
}

export const fetchEnquiryList = () => {
    return {
        type: ENQUIRY_LIST_LOADED,
        payload: agent.App.enquiryList()
    }
}

export const fetchCmsList = () => {
    return {
        type: CMS_LIST_LOADED,
        payload: agent.App.cmsList()
    }
}

export const setDeviceToken = (token) => {
    return {
        type: SET_DEVICE_TOKEN,
        payload: token
    }
}

export const setPaymentType = (type) => {
    return {
        type: SET_PAYMENT_TYPE,
        payload: type
    }
}