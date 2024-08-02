import api from "../api"


export const cartApi = {
    uploadCart :  (data, token) =>  api.post(
      'product/cart',
      data,
      {headers: {"Authorization": token}}
    ),
    getCartItems: (token) =>  api.get(
      'product/cart',
      {headers: {"Authorization": token}}
    ),
    deleteCartItems: (token, itemId) =>api.delete(
      `/product/cart/${itemId}`,
      { headers: { "Authorization": token } })
    // ---------------------------------------
    // getCartItems: (token) => axios.get('/api/cart', { headers: { Authorization: `Bearer ${token}` } }),
    // deleteCartItems: (token) => axios.delete('/api/cart', { headers: { Authorization: `Bearer ${token}` } }),
    // deleteCartItem: (token, itemId) => axios.delete(`/api/cart/${itemId}`, { headers: { Authorization: `Bearer ${token}` } }),
    // --------------------------------
}
