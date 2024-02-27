import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, FlatList } from "react-native";
import React, { useState, useRef } from "react";
import TextInputContainer from "./components/TextInputContainer";
import ClearMessages from "./components/ClearMessages";
import Message from "./components/Message";

export default function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(
    [] as { text: string; from: string; avatar: string; is_liked?: boolean }[]
  );

  const FlatListRef = useRef<FlatList>(null);

  const sendMessage = async (text: string) => {
    setMessages((prevMessages) => [
      {
        avatar: "https://hacktues.bg/workshop/sully.png",
        from: "Съли",
        id: 2,
        is_liked: false,
        text: "The highest building on earth is the Burj Khalifa in Dubai, United Arab Emirates. It stands at a height of 828 meters (2,716 feet) and was completed in 2010.",
      },
      ...prevMessages,
    ]);
  };

  const likeMessage = async (text: string) => {};

  const onClick = async () => {
    setMessages((prevMessages) => [
      { text, from: "You", avatar: "https://hacktues.bg/workshop/user.png" },
      ...prevMessages,
    ]);
    sendMessage(text);
    setText("");
  };

  return (
    <View style={styles.container}>
      {messages.length > 0 && <ClearMessages onClick={() => setMessages([])} />}
      {messages.length < 1 && (
        <Image
          style={{ width: 200, height: 200, position: "absolute", top: "38%" }}
          source={require("./assets/SullyGPT.png")}
        />
      )}
      <FlatList
        inverted={true}
        ref={FlatListRef}
        style={{
          width: "100%",
          height: 600,
          flex: 1,
          marginVertical: "20%",
        }}
        onContentSizeChange={() =>
          FlatListRef.current?.scrollToOffset({ offset: 0, animated: true })
        }
        data={messages}
        renderItem={({ item }) => (
          <Message
            text={item.text}
            from={item.from}
            avatar={item.avatar}
            isLiked={item.isLiked}
          />
        )}
      />
      <TextInputContainer onClick={onClick} text={text} SetText={setText} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    overflow: "hidden",
  },
});
