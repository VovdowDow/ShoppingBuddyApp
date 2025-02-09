import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";

const ItemCard = ({ name, price, image, isBought, onToggleBought, onDelete }) => {
    const navigation = useNavigation();

    return (
        <View style={[style.card, isBought && style.boughtCard]}>
            <View style={style.cardTop}>
                <TouchableOpacity style={style.checkButton} onPress={onToggleBought}>
                    <Icon name={isBought ? "check-box" : "check-box-outline-blank"} size={14} color="black" />
                    <Text style={style.checkText}>Make as purchased</Text>
                </TouchableOpacity>
            
            </View>

            <Image source={{ uri: image }} style={style.productImage} />
            <Text style={[style.productName, isBought && style.boughtText]}>
                {name}
            </Text>
            <Text style={[style.productPrice, isBought && style.boughtText]}>
                {price} ฿
            </Text>

            <View style={style.buttonContainer}>
                <CustomButton 
                    title=""
                    backgroundColor=""
                    textColor=""
                    width={35}
                    height={35}
                    iconName="delete"
                    iconSize={18}
                    iconColor="red"
                    borderRadius={15}
                    paddingVertical={5}
                    iconPosition="center"
                    onPress={onDelete}
                />
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    card: {
        backgroundColor: "#FDECEC",
        width: 165,
        height: 200,
        padding: 15,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        position: "relative",
        marginTop: 10,
    },
    cardTop: {
        flexDirection: "row",
        alignItems: "center",
    },
    boughtCard: {
        backgroundColor: "#D9D9D9",
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    productPrice: {
        fontSize: 16,
        color: "green",
        marginTop: 5,
    },
    boughtText: {
        textDecorationLine: "line-through",
        color: "gray",
    },
    buttonContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 5,
        right: 5,
        gap: 10,
    },
    checkButton: {
        bottom: 3,
        borderRadius: 15,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
    },
    checkText: {
        fontSize: 13,
    },
});

export default ItemCard;
