import { useState, createContext } from 'react';
import UserAPI from './UserAPI';
import CartAPI from './CartAPI';
import ProductAPI from './ProductAPI';
import CategoryAPI from './CategoryAPI';
import FoodStoreAPI from './FoodStoreAPI';
import OrderAPI from './OrderAPI';
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const state = {
        loading: [loading, setLoading],
        UserAPI: UserAPI(),
        CartAPI: CartAPI(),
        ProductAPI: ProductAPI(),
        CategoryAPI: CategoryAPI(),
        FoodStoreAPI: FoodStoreAPI(),
        OrderAPI: OrderAPI(),
    };
    return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
