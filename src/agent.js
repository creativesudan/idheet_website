import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
// import { add } from 'react-native-reanimated';
// import base64 from 'react-native-base64'


const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://idheet.com/backend/api';
const MEDIA_ROOT = '';

const encode = encodeURIComponent;
const responseBody = res => JSON.parse(res.text);

let token = null;
let userId = null;

const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Bearer ${token}`);
    }
}

const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) => {
        console.log(url);
        return superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).ok(res => res.status < 400 || res.status == 422).then(responseBody)
    }
};


const Auth = {
    fetchUser: (user_id = null) =>
        requests.post(`/showprofile`, {}),
    updateUser: (user) => {
        let reqStr = `/updateprofile?`;
        if (user.name) reqStr += `name=${user.name}&`;
        if (user.email) reqStr += `email=${user.email}&`;
        if (user.mobile) reqStr += `mobile=${user.mobile}&`;
        if (user.business_name) reqStr += `business_name=${user.business_name}&`;
        if (user.pan_no) reqStr += `pan_no=${user.pan_no}&`;
        if (user.gst_no) reqStr += `gst_no=${user.gst_no}&`;
        return requests.post(reqStr, {})
    },
    login: (mobile) =>
        requests.post(`/otp?mobile=${mobile}`, {}),
    verify: (mobile, otp, deviceToken) =>
        requests.post(`/login?mobile=${mobile}&otp=${otp}&device_token=dummy`, {}),
    register: (mobile) =>
        requests.post(`/register?mobile=${mobile}&device_token=dummy`, {}),
};


const Category = {
    all: () => requests.post('/categories'),
    products: (categoryId) => requests.post(`/products?category_id=${categoryId}`),
    brands: () => requests.post(`/brandlist`),
    brandProducts: (brand_id) => requests.post(`/brandshow?brand_id=${brand_id}`),
    sub: () => requests.post('/allcategories'),
    product: (productId) => requests.post(`/product?product_id=${productId}`),
}

const Product = {
    all: () => requests.post('?type=productlist&cat_id='),
    exclusiveProducts: () => requests.post(`/homeproductlist?home_type=exclusive`),
    popularProducts: () => requests.post(`/homeproductlist?home_type=promoted`),
    otherProducts: () => requests.post(`/homeproductlist?home_type=others`),
    recommendedProducts: () => requests.post(`/recommendedprdouctlist`),
}

const SliderImages = {
    all: () => requests.post('/bannerlist'),
}

const Cart = {
    coupons: () => requests.post('/couponlist'),
    verifyCoupon: (coupon_code) => requests.post(`/couponverify?coupon_code=${coupon_code}`),
    tax: () => requests.post('/taxes'),
    addItem: (item) => requests.post(`/addcartitem?product_id=${item.product_id}&weight=${item.weight}&
    unit=${item.unit}&price=${item.price}&discount_price=${item.discount_price}&qty=${item.qty}`),
    updateItem: (cart_id, item) => requests.post(`/editcartitem?cart_id=${cart_id}&product_id=${item.product_id}&weight=${item.weight}&
    unit=${item.unit}&price=${item.price}&discount_price=${item.discount_price}&qty=${item.qty}`),
    all: () => requests.post('/cartlist'),
    deleteItem: (cart_id) => requests.post(`/deletecartitem?cart_id=${cart_id}`),
    deliveryslots: () => requests.post(`/deliveryshot`),

}

const Order = {
    all: () => requests.post(`/orderlist`),
    addOrder: (address, payment_type, delivery_shot_id, coupon_value, coupon = null, payment_id = null) => {
        let reqStr = `/order?
        address1=${address.address1}&
        address2=${address.address2}&
        city=${address.city}&
        state=${address.state}&
        pincode=${address.pincode}&
        area=${address.area}&
        payment_type=${payment_type}&
        delivery_shot_id=${delivery_shot_id}`

        if (coupon) {
            reqStr += `&coupon_id=${coupon.coupon_id}&coupon_code=${coupon.coupon_code}&coupon_value=${coupon_value}`
        }
        if (payment_id) {
            reqStr += `&pg_id=${payment_id}`
        }
        return requests.post(reqStr);

    },
    codOrder: (orderId) => requests.post(`?type=codorder&order_id=${orderId}`),
    onlineOrder: (orderId, txnid, type) => requests.post(`?type=paymentorder&order_id=${orderId}&txnid=${txnid}&payment_type=${type}`),
    cancel: (itemId) => requests.post(`/changeorderitemstatus?item_id=${itemId}&status=cancelled`),
    cancelOrder: (orderId) => requests.post(`/ordercancel?order_id=${orderId}`),
    getOrderById: (orderId) => requests.post(`/showorder?order_id=${orderId}`)
}

const Address = {
    all: () => requests.post(`/addresses`, {}),
    save: (address) =>
        requests.post(`/addaddress?type=${address.type.id}
        &address1=${address.address1 || ""}
        &address2=${address.address2 || ""}
        &state=${address.state || ""}
        &default_address=${address.default_address ? 1 : 0}&phone=${address.phone || ""}
        &city=${address.city || ""}&pincode=${address.pincode || ""}&status=1`, {}),
    update: (address) =>
        requests.post(`/editaddress?address_id=${address.address_id}&type=${address.type.id}
        &address1=${address.address1 || ""}&address2=${address.address2 || ""}
        &state=${address.state || ""}
        &default_address=${address.default_address ? 1 : 0}&phone=${address.phone || ""}
        &city=${address.city || ""}&pincode=${address.pincode || ""}`, {}),
    delete: (address_id) =>
        requests.post(`/deleteaddress?address_id=${address_id}`, {}),
    verifypincode: (pincode) => requests.post(`/verifypincode?pincode=${pincode}`, {}),
}

const Search = {
    product: (name) => requests.post(`/search?type=product&name=${name}`, {}),
    category: (name) => requests.post(`/search?type=category&name=${name}`, {}),
    brand: (name) => requests.post(`/brandsearch?name=${name}`, {}),
}

const App = {
    settings: () => requests.post(`/settings`),
    enquiry: (enquire) => requests.post(`/addinquire?message=${enquire.message}
    &product_id=${enquire.product_id}&qty=${enquire.qty}`),
    deliveryAreas: () => requests.post(`/pincodelist`),
    enquiryList: () => requests.post(`/inquires`),
    cmsList: () => requests.post(`/cmslist`),
}


export default {
    Auth,
    Category,
    Address,
    Cart,
    setUserId: _userId => { userId = _userId; },
    setToken: _token => { token = _token; },
    MEDIA_ROOT,
    Product,
    Order,
    SliderImages,
    Search,
    App
};