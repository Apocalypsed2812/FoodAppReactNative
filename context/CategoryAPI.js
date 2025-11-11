import { useState, useEffect } from 'react';
import { getMethod } from '../utils/fetchData';

function CategoryAPI() {
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        const getCategorys = async () => {
            let response = await getMethod('category');
            return response;
        };
        getCategorys()
            .then((res) => {
                if (res.success) {
                    setCategorys(res.categorys);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return {
        categorys: [categorys, setCategorys],
    };
}

export default CategoryAPI;
