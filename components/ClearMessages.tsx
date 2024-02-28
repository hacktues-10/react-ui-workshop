import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function ClearMessages(props: { onClick: () => void }) {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: 10,
        backgroundColor: "white",
        margin: 10,
      }}
      onPress={props.onClick}
    >
      <Icon name="delete" size={30} color="black" />
    </TouchableOpacity>
  );
}
//
