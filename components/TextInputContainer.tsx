import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function TextInputContainer(props: {
  text: string;
  SetText: (text: string) => void;
  onClick: () => void;
}) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 20,
          padding: 10,
          paddingHorizontal: 20,
          width: "85%",
        }}
        placeholder="Message"
        onChangeText={props.SetText}
        value={props.text}
      />
      <SendButton onPress={() => props.onClick()} />
    </View>
  );
}

function SendButton(props: { onPress: () => void }) {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        borderRadius: 100,
        justifyContent: "center",
        height: 40,
        backgroundColor: "#fbebb7",
        alignItems: "center",
      }}
      onPress={props.onPress}
    >
      <Icon name="arrowup" size={16} color="black" />
    </TouchableOpacity>
  );
}
