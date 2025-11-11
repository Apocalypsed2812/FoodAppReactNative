import { useState, useEffect } from 'react'
import { getMethod } from '../utils/fetchData'

function UserAPI() {
    const [products, setProducts] = useState([])
    const [productsShow, setProductsShow] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            let response = await getMethod("product")
            return response
        }
        getProducts()
            .then(res => {
                if (res.success) {
                    setProducts(res.products)
                    //setProductsShow(res.products)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return {
        products: [products, setProducts],
        productsShow: [productsShow, setProductsShow]
    }
}

export default UserAPI
