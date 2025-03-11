import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  IMessage,
  Send,
  Message,
  Bubble,
} from "react-native-gifted-chat";
import * as ImagePicker from "expo-image-picker";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useGetMessages, useSendMessage } from "@/hooks/conversation.hook";
import Transaction from "@/components/history/item";
import { useGetProfile } from "@/hooks/auth.hook";
import { uriToBlob } from "@/utils/uri-to-blob";

const styles = StyleSheet.create({
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
  accessoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  imageButton: {
    marginRight: 10,
    padding: 8,
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
  typingContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  typingText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  transactionContainer: {
    marginTop: 4,
    marginHorizontal: 8,
  },
  sendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});

const renderBubble = (props: any) => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#007AFF",
        borderRadius: 20,
        padding: 4,
      },
      left: {
        backgroundColor: "#E8E8E8",
        borderRadius: 20,
        padding: 4,
      },
    }}
    textStyle={{
      right: {
        color: "#FFFFFF",
      },
      left: {
        color: "#000000",
      },
    }}
  />
);

interface ICustomMessage extends IMessage {
  transaction?: [
    {
      id: string;
      amount: number;
      description: number;
    }
  ];
}

const ChatScreen: React.FC = () => {
  const botUserID = "679f670cfb66611953fa9e44";
  const [messages, setMessages] = useState<ICustomMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [currentUserID, setCurrentUserID] = useState<string>("");
  const [inputText, setInputText] = useState("");
  const [audioRecorder] = useState(new AudioRecorderPlayer());
  const [isBotTyping, setIsBotTyping] = useState(false);
  const { data } = useGetMessages();
  const { data: dataUser } = useGetProfile(
    new Date().toISOString().split("T")[0],
    new Date().toISOString().split("T")[0]
  );
  const { mutate } = useSendMessage();

  useEffect(() => {
    if (data && dataUser) {
      setMessages(data.messages);
      setCurrentUserID(dataUser.user._id);
      setConversationId(data.conversation);
    }
  }, [data, dataUser]);

  const renderSend = (props: any) => (
    <View style={styles.sendContainer}>
      <TouchableOpacity onPress={onSendImage} style={styles.imageButton}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/PlusCM128.svg/1200px-PlusCM128.svg.png",
          }}
          style={styles.imageIcon}
        />
      </TouchableOpacity>
      <Send {...props}>
        <View style={styles.sendButton}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3682/3682321.png",
            }}
            resizeMode="contain"
            style={styles.sendIcon}
          />
        </View>
      </Send>
    </View>
  );

  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    return (
      <View>
        <Message {...props} />
        {currentMessage.transaction && (
          <View style={styles.transactionContainer}>
            {currentMessage.transaction.map((item: any) => (
              <Transaction
                key={item._id}
                className="w-[200px]"
                _id={item._id}
                amount={item.amount}
                createdAt={item.createdAt}
                type={"Done"}
                description={item.description}
                icon={"✅"}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const onSend = useCallback(
    (newMessages: ICustomMessage[] = []) => {
      const userMessage = newMessages[0]?.text;
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, newMessages)
      );

      setIsBotTyping(true);
      const currentConversationId = conversationId;
      mutate(
        {
          text: userMessage,
          conversationId: currentConversationId,
          botId: botUserID,
          file: null,
        },
        {
          onSuccess: (data) => {
            const replyMessage: ICustomMessage = {
              _id: Math.random().toString(),
              text: data.text || "Bot response",
              createdAt: new Date(),
              user: { _id: botUserID, name: "Bot" },
              transaction: data.transactions,
            };
            setMessages((prevMessages) =>
              GiftedChat.append(prevMessages, [replyMessage])
            );
          },
          onSettled: () => setIsBotTyping(false),
        }
      );
    },
    [conversationId]
  );

  const onSendImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const file = await uriToBlob(result.assets[0].uri);

      setIsBotTyping(true);
      const currentConversationId = conversationId;
      mutate(
        {
          text: "",
          conversationId: currentConversationId,
          botId: botUserID,
          file: file,
        },
        {
          onSuccess: (data) => {
            const replyMessage: ICustomMessage = {
              _id: Math.random().toString(),
              text: data.text || "Bot response",
              createdAt: new Date(),
              user: { _id: botUserID, name: "Bot" },
              transaction: data.transactions,
            };
            setMessages((prevMessages) =>
              GiftedChat.append(prevMessages, [replyMessage])
            );
          },
          onSettled: () => setIsBotTyping(false),
        }
      );
      const imageMessage: ICustomMessage = {
        _id: Math.random().toString(),
        text: "",
        createdAt: new Date(),
        user: { _id: currentUserID, name: "Bạn" },
        image: result.assets[0].uri,
      };
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [imageMessage])
      );
    }
  };

  const renderAccessory = () => (
    <View style={styles.accessoryContainer}>
      <TouchableOpacity onPress={onSendImage} style={styles.imageButton}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/PlusCM128.svg/1200px-PlusCM128.svg.png",
          }}
          style={styles.imageIcon}
        />
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () =>
    isBotTyping ? (
      <View style={styles.typingContainer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.typingText}>Bot is typing...</Text>
      </View>
    ) : null;

  return (
    <GiftedChat
      messages={messages}
      text={inputText}
      onInputTextChanged={setInputText}
      renderMessage={renderMessage}
      renderSend={renderSend}
      renderBubble={renderBubble}
      onSend={(newMessages: ICustomMessage[]) => {
        onSend(newMessages);
        setInputText("");
      }}
      user={{ _id: currentUserID, name: "Bạn" }}
      renderUsernameOnMessage={true}
      messagesContainerStyle={{ backgroundColor: "#ffffff" }}
      alwaysShowSend={true}
      renderFooter={renderFooter}
      timeFormat="HH:mm"
      dateFormat="LL"
      textInputProps={{
        value: inputText,
        onChangeText: setInputText,
        onKeyPress: (e: { key: string; preventDefault: () => void }) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (inputText.trim()) {
              onSend([
                {
                  _id: Math.random().toString(),
                  text: inputText.trim(),
                  createdAt: new Date(),
                  user: { _id: currentUserID, name: "Bạn" },
                },
              ]);
              setInputText("");
            }
          }
        },
        returnKeyType: "send",
        placeholder: "Type a message...",
      }}
      renderTime={(props) => (
        <Text className="text-xs text-white mr-2">
          {new Date(props.currentMessage.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
    />
  );
};

export default ChatScreen;
