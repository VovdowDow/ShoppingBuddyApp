import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


const CustomButton = ({ 
  title, 
  backgroundColor, 
  textColor,
  onPress, 
  width, 
  height, 
  fontSize, 
  iconName,
  iconSize,
  iconColor,
  borderRadius,
  paddingHorizontal,
  paddingVertical,
  iconPosition,
}) => {
  const buttonContentStyle = {
    flexDirection: iconPosition === "right" ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconStyle = {
    marginRight: iconPosition === "right" ? 0 : 10,
    marginLeft: iconPosition === "left" ? 0 : 10,
  };

    return (
      <TouchableOpacity 
        style={[ 
          style.button, 
          { 
            backgroundColor, 
            width, 
            height, 
            borderRadius, 
            paddingHorizontal, 
            paddingVertical 
          }
        ]}
        onPress={onPress}
      >
          <View style={[style.buttonContent, buttonContentStyle]}>
          {iconName && (
            <Icon 
              name={iconName} 
              size={iconSize} 
              color={iconColor} 
              style={[style.icon, iconStyle]} 
            />
          )}
          <Text style={[style.buttonText, { color: textColor, fontSize }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
};

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontWeight: "500",
  },
});

export default CustomButton;






