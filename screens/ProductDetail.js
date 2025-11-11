import React, { useContext } from "react";
import {Text, StyleSheet, View, Image, ScrollView, ToastAndroid} from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons'; 

import { postMethod } from "../utils/fetchData";
import {GlobalState} from '../context/GlobalState';

export default function ProductDetail({navigation}){
    ProductDetail.navigationOptions = {
        title: navigation.getParam('product').name
    };

    const state = useContext(GlobalState);
    const isLogin = state.UserAPI.login[0];
    const [cart, setCart] = state.UserAPI.cart;
    const [productsShow, setProductsShow] = state.ProductAPI.productsShow;

    let product = navigation.getParam('product');
    
    const handleAddToCart = () => {
        if (!isLogin) {
            ToastAndroid.show('Vui lòng đăng nhập để tiếp tục', ToastAndroid.SHORT)
            return;
        }
        postMethod('add-to-cart', { product_id: product._id })
            .then((res) => {
                if (res.success) {
                    setCart([...cart, product._id]);
                    navigation.navigate('Cart')
                } else {
                    ToastAndroid.show(res.message, ToastAndroid.SHORT)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.wrapper__image}>
                    <Image source={{uri: product.image_url}} style={styles.image}/>
                </View>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price} VND</Text>
                <Text style={styles.quantity}>Số lượng: {product.quantity}</Text>
                <Text style={styles.foodstore}>Địa chỉ: {product.foodstore}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.button} onPress={handleAddToCart}>
                    {/* <Feather name="shopping-cart" size={18} color="green" style={styles.icon__cart}/> */}
                    <Text style={styles.text__cart}>+ Thêm vào giỏ hàng</Text>
                </Text>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flex: 1,
        minHeight: 700,
    },
    wrapper__image:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: 250,
        height: 250,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 16,
    },
    price: {
        fontSize: 18,
        color: '#ccc',
        marginBottom: 16,
    },
    foodstore: {
        fontSize: 18,
        marginVertical: 16,
    },
    description: {
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 60,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -100 }],
        borderColor: 'green',
        borderRadius: 28,
        borderWidth: 1,
        color: 'green',
        paddingHorizontal: 40,
        paddingVertical: 8,
        fontSize: 18,
    }, 
    icon__cart:{
        width: 40,
    }, 
    text__cart:{
        marginLeft: 8,
    }
});