import { View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { MessageType } from "../types";

export default function Message(props: {
  id: number;
  text: string;
  from: string;
  avatar: string;
  isLiked: boolean;
  toggleLike: (message: MessageType) => void;
}) {
  return (
    <View
      style={{
        alignSelf: props.from === "Съли" ? "flex-start" : "flex-end",
        maxWidth: "80%",
        flexDirection: props.from === "Съли" ? "row" : "row-reverse",
        margin: 5,
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: props.avatar }}
        alt="Avatar"
        style={{ width: 30, height: 30, margin: 4, borderRadius: 20 }}
      />
      <View
        style={{
          backgroundColor: props.from === "Съли" ? "#fbebb7" : "#ec626d",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "black" }}>{props.text}</Text>
      </View>
      <Icon
        name={props.isLiked ? "like1" : "like2"}
        size={16}
        style={{
          margin: 5,
          display: props.from === "Съли" ? "flex" : "none",
        }}
        color="black"
        onPress={() => {
          props.toggleLike({
            id: props.id,
            text: props.text,
            from: props.from,
            avatar: props.avatar,
            is_liked: props.isLiked,
          });
        }}
      />
    </View>
  );
}
