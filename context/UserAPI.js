import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMethod } from '../utils/fetchData';
import { TOKEN_NAME } from '../credentials';
function UserAPI() {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        // let token = await AsyncStorage.getItem(TOKEN_NAME)
        const checkUserIsLogin = async () => {
            let token = await AsyncStorage.getItem(TOKEN_NAME)
            const res = await getMethod('get-user');
            if (res.success) {
                if(token){
                    setIsLogin(true);
                    setUser(res.user);
                    setCart(res.user.cart);
                }
                // if (res.user.role === 'admin') setIsAdmin(true);
            } else {
                console.log(res.message);
            }
        };
        // if (token) checkUserIsLogin();
        checkUserIsLogin();
    }, [isLogin]);
    return {
        login: [isLogin, setIsLogin],
        admin: [isAdmin, setIsAdmin],
        user: [user, setUser],
        cart: [cart, setCart],
    };
}

export default UserAPI;
