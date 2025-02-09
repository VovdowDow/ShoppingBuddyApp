import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, Image, FlatList, ScrollView } from "react-native";
import CustomButton from "../Component/CustomButton";
import ItemCard from "../Component/ItemCard";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation, route }) => {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const storedProducts = await AsyncStorage.getItem("products");
                if (storedProducts) {
                    setProducts(JSON.parse(storedProducts));
                }
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };
    
        loadProducts();
    }, []); 

    useFocusEffect(
        useCallback(() => {
            const loadProducts = async () => {
                try {
                    const storedProducts = await AsyncStorage.getItem("products");
                    let productsList = storedProducts ? JSON.parse(storedProducts) : [];
    
                    if (route.params?.newProduct) {
                        productsList = [...productsList, route.params.newProduct];
                    }
                    if (route.params?.updatedProduct !== undefined) {
                        productsList[route.params.index] = route.params.updatedProduct;
                    }
    
                    setProducts(productsList);
                    await AsyncStorage.setItem("products", JSON.stringify(productsList));
                } catch (error) {
                    console.error("Failed to load products:", error);
                }
            };
            loadProducts();
        }, [route.params?.newProduct, route.params?.updatedProduct, route.params?.index])
    );
    
    
    const deleteProduct = (index) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.filter((_, i) => i !== index);
            AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };
    
    const toggleBought = (index) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((item, i) =>
                i === index ? { ...item, isBought: !item.isBought } : item
            );
            return updatedProducts;
        });
    };
    
    
    useEffect(() => {
        AsyncStorage.setItem("products", JSON.stringify(products));

        const newTotal = products
            .filter(product => !product.isBought)
            .reduce((sum, product) => sum + parseFloat(product.price || 0), 0);
        setTotalPrice(newTotal);
    }, [products]);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <View style={style.container}>
            
                <View style={style.top}>
                    <Text style={style.textShop}>Shop</Text>
                    <TextInput
                    style={style.input}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                </View>

                <View style={style.buttonContainer}>
                    <CustomButton 
                        title="Clear All"
                        backgroundColor="#D03F42"
                        textColor="black"
                        width={150} 
                        height={30}
                        fontSize={18} 
                        borderRadius={20}
                        paddingVertical={2}
                        onPress={() => {
                            setProducts([]);
                            AsyncStorage.removeItem("products");
                        }}
                    />
                    <CustomButton 
                        title="Add Product"
                        backgroundColor="#7373D2"
                        textColor="black"
                        width={150} 
                        height={30}
                        fontSize={18} 
                        borderRadius={20}
                        paddingVertical={2}
                        onPress={() => navigation.navigate("Add")}
                    />
                </View>

                <Text style={style.textMyproduct}>My Product</Text>

                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <ItemCard 
                            name={item.name} 
                            price={item.price} 
                            image={item.image || "https://via.placeholder.com/100"} 
                            isBought={item.isBought} 
                            onToggleBought={() => toggleBought(index)}
                            onDelete={() => deleteProduct(index)}
                            item={item}
                        />
                    )}
                    numColumns={2}
                    columnWrapperStyle={style.row}
                />

                <View style={style.totalContainer}>
                    <Text style={style.totalText}>
                        Total Price : {totalPrice.toFixed(2)} ฿
                    </Text>
                </View>

        </View>
    );
};


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#ECD4D4",
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        marginTop: 12,
    },
    textShop: {
        fontSize: 30,
        fontWeight: "bold",
    },
    textMyproduct: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
    },
    input: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: "#ccc",
        borderRadius: 20,
        padding: 10,
        fontSize: 15,
        backgroundColor: "#FFFFFF",
    },
    img: {
        width: 335,
        height: 150,
        marginTop: 15,
        alignSelf: "center",
    },
    row: {
        justifyContent: "space-between",
    },
    totalContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    
});

export default HomeScreen;
