import React, { useContext } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';

import TDTU from '../assets/logo_tdtu.jpg';
import {GlobalState} from '../context/GlobalState'
import { postMethod } from "../utils/fetchData";

export default function FoodStoreScreen({navigation}){
    FoodStoreScreen.navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('foodStore').name
        };
    };

    const state = useContext(GlobalState)
    const isLogin = state.UserAPI.login[0];
    const [cart, setCart] = state.UserAPI.cart;
    const [products, setProducts] = state.ProductAPI.products;

    let foodStore = navigation.getParam('foodStore')

    let productList = products.filter((item, index) => (
        item.foodstore == foodStore.name
    ))

    const handleAddToCart = (id) => {
        console.log("Id foodstore add to cart is: ", id)
        if (!isLogin) {
            ToastAndroid.show('Vui lòng đăng nhập để tiếp tục', ToastAndroid.SHORT)
            return;
        }
        postMethod('add-to-cart', { product_id: id })
            .then((res) => {
                if (res.success) {
                    setCart([...cart, id]);
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
            <View style={styles.header}>
                <Text style={styles.header__title}>{foodStore.name}</Text>
                <Image style={styles.header__image} source={{uri: foodStore.image_url}}/>
            </View>
            <View style={styles.subheader}>
                <ScrollView
                    horizontal={true}
                    >
                        <View style={styles.subheader__content}>
                            <View style={{flex: 1}}>
                                <Text>4.5</Text>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                <Text>600+ đánh giá</Text>
                            </View>
                        </View>
                        <View style={styles.subheader__content}>
                            <View style={{flex: 1}}>
                                <Text>4.5</Text>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                <Text>600+ đánh giá</Text>
                            </View>
                        </View>
                        <View style={styles.subheader__content}>
                            <View style={{flex: 1}}>
                                <Text>4.5</Text>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                <Text>600+ đánh giá</Text>
                            </View>
                        </View>
                        <View style={styles.subheader__content}>
                            <View style={{flex: 1}}>
                                <Text>4.5</Text>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                <Text>600+ đánh giá</Text>
                            </View>
                        </View>
                </ScrollView>
            </View>
            <View style={styles.trans}>
                <Image source={TDTU} style={styles.trans__image} />
                <View style={styles.trans__text}>
                    <Text>Giao hàng</Text>
                    <Text>Giao hàng trong 21 phút</Text>
                </View>
            </View>
            <Text style={styles.title}>Món Hot</Text>
            <View style={styles.product__row}>
                {productList.map((item, index) => (
                    <TouchableOpacity style={styles.product__col_6} key={index} onPress={() => {navigation.navigate("ProductDetail", {product: item})}}>
                        <View style={styles.product}>
                            <Image style={styles.product__image} source={{uri: item.image_url}}/>
                            <Text style={styles.product__title}>{item.name}</Text>
                            <Text style={styles.product__price}>{item.price} đ</Text>
                            <Text style = {styles.product__btn} onPress={() => handleAddToCart(item._id)}>
                                Thêm
                            </Text>
                        </View>
                    </TouchableOpacity> 
                ))} 
            </View>
            <Text style={styles.title}>Món Chính</Text>
            <View style={styles.product__row}>
                {productList.map((item, index) => ( 
                    <View style={styles.product__col_12} key={index}>
                        <View style={styles.product__primary}>
                            <View>
                                <View style={{flex: 2}}>
                                    <Text style={styles.product__title}>{item.name}</Text>
                                    <Text style={styles.product__price}>{item.price} đ</Text>
                                </View>
                            </View>
                            <View>
                                <View style={{flex: 2}}>
                                    <Image style={styles.product__primary__image} source={{uri: item.image_url}}/>
                                </View>
                                <Text style = {styles.product__primary__btn} onPress={() => handleAddToCart(item._id)}>
                                    Thêm
                                </Text>
                            </View>
                        </View>
                    </View> 
                ))} 
            </View>
          </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        boxSizing: 'border-box',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    header__image: {
        width: 64,
        height: 64,
    },
    header__title: {
        width: 280,
        fontSize: 22,
    },
    subheader__content:{
        marginTop: 16,
        height: 90,
        width: 130,
        borderWidth: 0.5,
        borderRightColor: '#dddddd',
        backgroundColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trans:{
        marginVertical: 16,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 16,
    },
    trans__image:{
        width: 30,
        height: 30,
        borderRadius: 9999,
    },
    trans__text: {
        marginLeft: 12,
    },
    title:{
        textTransform: 'uppercase', 
        marginVertical: 16, 
        fontSize: 20, 
        fontWeight: '600',
    },
    product__row: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 16,
        flexDirection: 'row',
        marginHorizontal: -4,
        paddingLeft: 8,
    },
    product__col_6: {
        width: '50%',
        height: 200,
        paddingHorizontal: 4,
        marginBottom: 20,
    },
    product__col_12: {
        width: '100%',
        height: 200,
        paddingHorizontal: 4,
        marginBottom: 4,
    },
    product: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        // borderColor: '#ccc',
        // borderWidth: 1,
        paddingVertical: 16,
    },
    product__primary: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        borderColor: '#ccc',
        borderWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    product__image: {
        // flex: 1,
        // width: null,
        // height: null,
        // resizeMode: 'cover',
        width: 100,
        height: 64,
    },
    product__primary__image: {
        width: 100,
        height: 64,
    },
    product__title: {
        fontSize: 20,
        marginVertical: 16,
        height: 30,
        width: 200,
    },
    product__price: {

    },
    product__btn: {
        width: '100%',
        backgroundColor: 'transparent',
        color: 'green',
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 16,
        marginVertical: 16,
        textAlign: 'center',
        paddingVertical: 4,
    },
    product__primary__btn:{
        width: '100%',
        backgroundColor: 'transparent',
        color: 'green',
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 16,
        marginVertical: 16,
        textAlign: 'center',
        paddingVertical: 4,
    }
})