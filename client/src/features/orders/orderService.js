import axios from "axios"

const fetchOrders = async( token ) => {
     const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('/api/order/all/my-orders',options )
    return response.data
}

const orderMeal = async( id , token ) => {
     const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('/api/order/create-order/' + id, "" , options )
    return response.data
}

const updateMeal = async( id , token ) => {
     const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put('/api/order/' + id, "" , options )
    return response.data
}

const orderService = { fetchOrders , orderMeal  , updateMeal }


export default orderService