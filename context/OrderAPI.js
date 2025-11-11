import { useState, useEffect } from 'react';
import { getMethod } from '../utils/fetchData';

function OrderAPI() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            let response = await getMethod('order');
            return response;
        };
        getOrders()
            .then((res) => {
                if (res.success) {
                    setOrders(res.orders);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return {
        orders: [orders, setOrders],
    };
}

export default OrderAPI;
