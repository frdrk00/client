import axios from "axios"

export const baseURL = "https://us-central1-food-app-frdrk00.cloudfunctions.net/app"

export const validateUserJWTToken = async (token) => {
    try {
        const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
            headers : {
                Authorization: "Bearer " + token
            },
        })

        return res.data.data
    } catch (error) {
        return null
    }
}


/* add new products */

export const addNewProduct = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/create`, {...data});
        return res.data.data;
    } catch (error) {
        return null
    }
}

/* get all the products */
export const getAllProducts = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/products/all`);
        return res.data.data;
    } catch (error) {
        return null
    }
}

/* delete a product */
export const deleteProduct = async (productId) => {
    try {
        const res = await axios.delete(`${baseURL}/api/products/delete/${productId}`);
        return res.data.data;
    } catch (error) {
        return null
    }
}

/* all users */
export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/users/all`);
        return res.data.data;
    } catch (error) {
        return null
    }
}

/* add an item to cart */
/* add new items to the cart */
export const addNewItemToCart = async (user_id, data) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/addToCart/${user_id}`, {...data})
        return res.data.data
    } catch (error) {
        return null
    }
}

export const getAllCartItems = async (user_id) => {
    try {
        const res = await axios.get(`${baseURL}/api/products/getCartItems/${user_id}`)
        return res.data.data
    } catch (error) {
        return  null
        
    }
}

/* cart increment */ /* cart decrement */
export const increaseItemQuantity = async (user_id, productId, type) => {
    console.log(user_id, productId, type);
    try {
        const res = await axios.post(`${baseURL}/api/products/updateCart/${user_id}`, null,
        { params: { productId: productId, type: type }})
        return res.data.data
    } catch (error) {
        return null
    }
}

/* orders */
export const getAllOrders = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/products/orders/`)
        return res.data.data
    } catch (error) {
        return  null
        
    }
}

/* update the order status */
export const updateOrderSts = async (order_id, sts) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/updateOrder/${order_id}`, 
        null, { params: { sts: sts }})
        return res.data.data
    } catch (error) {
        return null
    }
}
