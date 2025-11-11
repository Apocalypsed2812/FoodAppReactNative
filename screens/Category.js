import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';

import {GlobalState} from '../context/GlobalState'
import { postMethod } from "../utils/fetchData";

export default function Category({navigation}) {
    Category.navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('categoryName')
        };
    };

    const state = useContext(GlobalState)
    const isLogin = state.UserAPI.login[0];
    const [cart, setCart] = state.UserAPI.cart;
    const [products, setProducts] = state.ProductAPI.products;
    const [productsShow, setProductsShow] = state.ProductAPI.productsShow;

    let categoryName = navigation.getParam('categoryName')
    
    let productList = products.filter((item, index) => (
        item.category == categoryName
    ))
    
    const handleAddToCart = (id) => {
        console.log("Id category add to cart is: ", id)
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
          </View>
        </ScrollView>
    );

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
  wrapper:{
    flex: 1,
    paddingHorizontal: 8
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
  product__image: {
      // flex: 1,
      // width: null,
      // height: null,
      // resizeMode: 'cover',
      width: 100,
      height: 64,
  },
  product__title: {
      fontSize: 20,
      marginVertical: 16,
      height: 30,
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
});
