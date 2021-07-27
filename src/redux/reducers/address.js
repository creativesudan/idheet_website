import {
    ADDRESS_LOADED,
    ADDRESS_SAVED,
    ADDRESS_UPDATED,
    ADDRESS_DELETED,
    PINCODE_VERIFIED,
    UPDATE_EDITADDRESS_FIELD,
    UPDATE_ADDADDRESS_FIELD,
    UPDATE_ADDRESS_FIELD,
    LOGOUT
} from "../actions/types";

const initialState = {}

export default function (state = initialState, action) {

    switch (action.type) {
        case ADDRESS_LOADED:
            return {
                ...state,
                addresses: addressModels(action.payload)
            }
        case ADDRESS_SAVED:
        case ADDRESS_UPDATED:
        case ADDRESS_DELETED:
            return {
                ...state
            }
        case UPDATE_ADDADDRESS_FIELD:
            return { ...state, addAddress: { ...state.addAddress, [action.key]: action.value } };
        case UPDATE_EDITADDRESS_FIELD:
            return { ...state, editAddress: { ...state.editAddress, [action.key]: action.value } };

        case UPDATE_ADDRESS_FIELD:
            return { ...state, [action.key]: action.value };
        case PINCODE_VERIFIED:
            if (action.error) {
                const errorMsg = "We dont deliver to this pincode yet."
                return {
                    ...state,
                    addAddress: { ...state.addAddress, error: errorMsg, pincode_verified: false },
                    editAddress: { ...state.editAddress, error: errorMsg, pincode_verified: false }
                }
            }
            if (state.addAddress && state.addAddress.error) {
                delete state.addAddress.error;
            }

            if (state.editAddress && state.editAddress.error) {
                delete state.editAddress.error;
            }

            return {
                ...state,
                addAddress: {
                    ...state.addAddress,
                    pincode_verified: true,
                    city: action.payload.city,
                    state: action.payload.state,
                    area: action.payload.area,
                },
                editAddress: {
                    ...state.editAddress,
                    pincode_verified: true,
                    city: action.payload.city,
                    state: action.payload.state,
                    area: action.payload.area,
                }
            }
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
}

function getAddressTypeInt(type) {
    switch (type) {
        case "Home":
            return 0;
        case "Office":
            return 1;
        default:
            return 2;
    }
}

function addressModel(address) {
    return {
        ...address,
        pincode_verified: true
    }
}

function addressModels(addresses) {
    let objects = [];
    if (addresses) {
        addresses.map(address => {
            objects.push(addressModel(address));
        })
    }
    return objects;
}