import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, FlatList } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import TextInputContainer from "./components/TextInputContainer";
import ClearMessages from "./components/ClearMessages";
import Message from "./components/Message";
import { MessageType } from "./types";
export default function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([] as MessageType[]);

  const FlatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    try {
      fetch("http://167.99.139.2/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prevMessages) => {
            return [...data.reverse(), ...prevMessages];
          });
          setText("");
        });
    } catch (error) {
      console.error(error);
      setText("");
    }
  };

  const toggleLike = async (message: MessageType) => {
    try {
      fetch(`http://167.99.139.2/messages/${message.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_liked: !message.is_liked,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prevMessages) => {
            return prevMessages.map((msg) => {
              if (msg.id === message.id) {
                return data;
              }
              return msg;
            });
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const clearHistory = async () => {
    try {
      fetch("http://167.99.139.2/messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        fetch("http://167.99.139.2/messages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setMessages(data.reverse());
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <View style={styles.container}>
      {messages.length > 0 && <ClearMessages onClick={clearHistory} />}
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
            key={item.id}
            id={item.id}
            text={item.text}
            from={item.from}
            avatar={item.avatar}
            is_liked={item.is_liked}
            toggleLike={toggleLike}
          />
        )}
      />
      <TextInputContainer onClick={sendMessage} text={text} SetText={setText} />
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
