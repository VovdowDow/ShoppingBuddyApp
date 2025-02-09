import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomButton from "../Component/CustomButton";

const AddScreen = ({navigation}) => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleAddProduct = () => {
        if (!name || !price) {
            alert("กรุณากรอกชื่อและราคาสินค้า ❗️");
            return;
        }
        if (isNaN(price)) {
            alert("กรุณากรอกราคาสินค้าเป็นตัวเลข");
            return;
        }
        const newProduct = { name, price: parseFloat(price), image };
        navigation.navigate("Home", { newProduct });
    };
    
    return (
        <View style={style.contrainer}>
            <Text style={style.text}>Add Product</Text>
            <TextInput 
                style={style.inputimg} 
                placeholder="Add Image"
                value={image}
                onChangeText={setImage}
            />  
            <TextInput 
                style={style.input} 
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                style={style.input} 
                placeholder="Product Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            /> 
        <View style={style.buttonContainer}>
            <CustomButton 
                title="Cancel"
                backgroundColor="#E41818"
                textColor="black"
                width={150} 
                height={35}
                fontSize={22} 
                borderRadius={20}
                paddingVertical={2}
                onPress={() => navigation.navigate("Home")}
            />
            <CustomButton 
                title="Done"
                backgroundColor="#49E719"
                textColor="black"
                width={150} 
                height={35}
                fontSize={22} 
                borderRadius={20}
                paddingVertical={2}
                onPress={handleAddProduct}
            />
          </View>
        </View>
    );
};

const style = StyleSheet.create({
    contrainer: {
        flex: 1,
        padding: 30,
        backgroundColor: '#E1F5FE',
    },
    text:{
        fontSize: 28,
        fontWeight: "bold",
    },
    inputimg:{
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        fontSize: 15,
        height: 200,
        width: 200,
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
    },
    input:{
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 15,
      },
})

export default AddScreen;