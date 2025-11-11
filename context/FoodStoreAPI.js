import { useState, useEffect } from 'react';
import { getMethod } from '../utils/fetchData';

function FoodStoreAPI() {
    const [foodStores, setFoodStores] = useState([]);
    useEffect(() => {
        const getFoodStores = async () => {
            let response = await getMethod('foodstore');
            return response;
        };
        getFoodStores()
            .then((res) => {
                if (res.success) {
                    setFoodStores(res.foodStores);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return {
        foodStores: [foodStores, setFoodStores],
    };
}

export default FoodStoreAPI;
