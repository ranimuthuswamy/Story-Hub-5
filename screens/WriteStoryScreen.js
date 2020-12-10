import * as React from "react";
import { Header } from "react-native-elements";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
  Keyboard,
} from "react-native";
import * as firebase from "firebase";
import db from "../config";

export default class WriteStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      storyText: "",
    };
  }

  submitStory = async () => {
    db.collection("stories").add({
      title: this.state.title,
      author: this.state.author,
      storyText: this.state.storyText,
      date: firebase.firestore.Timestamp.now().toDate(),
    });
    //Alert.alert("Story Submitted!");
    ToastAndroid.show("The story is submitted.", ToastAndroid.SHORT);
    this.setState({
      title: "",
      author: "",
      storyText: "",
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fce38a",
        }}
      >
        <Header
          backgroundColor={"#f38181"}
          centerComponent={{
            text: "Story Hub",
            style: { fontSize: 28, color: "#fff" },
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
          >
            <TextInput
              style={styles.inputBox}
              placeholder="Story Title"
              placeholderTextColor="black"
              onChangeText={(txt) => this.setState({ title: txt })}
              value={this.state.title}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Author"
              placeholderTextColor="black"
              onChangeText={(txt) => {
                this.setState({ author: txt });
              }}
              value={this.state.author}
            />
            <TextInput
              style={styles.inputBoxMultiline}
              placeholder="Write your Story"
              placeholderTextColor="black"
              onChangeText={(txt) => {
                this.setState({
                  storyText: txt,
                });
              }}
              value={this.state.storyText}
              multiline={true}
            />

            <TouchableOpacity style={styles.button} onPress={this.submitStory}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: "90%",
    height: 50,
    borderWidth: 2,
    margin: 20,
    padding: 5,
  },
  inputBoxMultiline: {
    width: "90%",
    height: "35%",
    borderWidth: 2,
    margin: 20,
    padding: 5,
  },
  button: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#95e1d3",
    width: 200,
    height: 50,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
