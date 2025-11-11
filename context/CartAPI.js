import { useState } from 'react'


function UserAPI() {
    const [cart, setCart] = useState({})
    return {
        cart: [cart, setCart]
    }
}

export default UserAPI
