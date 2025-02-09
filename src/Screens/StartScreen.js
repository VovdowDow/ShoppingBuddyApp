import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import CustomButton from "../Component/CustomButton";

const StartScreen = ({navigation}) => {
    return (
        <ImageBackground 
            source={require("../img/background.png")}
            style={style.background}
        >
        <View style={style.container}>
            <Image source={require("../img/logo.png")} style={style.logo} />
            <Text style={style.text}>Buddy{"\n"}Shopee</Text>
            <View style={style.buttonContainer}>
                <CustomButton 
                    title="Let's get started >>"
                    backgroundColor="#4E4ED1"
                    textColor="white"
                    width={320}
                    height={50}
                    fontSize={22}
                    borderRadius={16}
                    paddingVertical={10}
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
        </View>
        </ImageBackground>
    );
};

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    text: {
        fontSize: 45,
        fontWeight: "bold",
        textAlign: "center",
    },
    logo:{
        width: 80, 
        height: 92,
    },
    buttonContainer: {
        marginTop: 30, 
    },

})

export default StartScreen;
