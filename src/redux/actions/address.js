import {
    ADDRESS_LOADED,
    ADDRESS_SAVED,
    ADDRESS_UPDATED,
    ADDRESS_DELETED,
    PINCODE_VERIFIED,
    UPDATE_ADDADDRESS_FIELD,
    UPDATE_EDITADDRESS_FIELD,
    UPDATE_ADDRESS_FIELD
} from "./types";
import agent from "../../agent";

export const fetchAddressList = () => {
    return {
        type: ADDRESS_LOADED,
        payload: agent.Address.all()
    }
}

export const saveAddress = (address) => {
    return {
        type: ADDRESS_SAVED,
        payload: agent.Address.save(address)
    }
}

export const updateAddress = (address) => {
    return {
        type: ADDRESS_UPDATED,
        payload: agent.Address.update(address)
    }
}

export const deleteAddress = (address_id) => {
    return {
        type: ADDRESS_DELETED,
        payload: agent.Address.delete(address_id)
    }
}

export const verifyPincode = (pincode) => {
    return {
        type: PINCODE_VERIFIED,
        payload: agent.Address.verifypincode(pincode)
    }
}

export const updateAddAddressField = (key, value) => {
    return {
        type: UPDATE_ADDADDRESS_FIELD,
        key,
        value
    }
}

export const updateEditAddressField = (key, value) => {
    return {
        type: UPDATE_EDITADDRESS_FIELD,
        key,
        value
    }
}

export const updateAddressField = (key, value) => {
    return {
        type: UPDATE_ADDRESS_FIELD,
        key,
        value
    }
}