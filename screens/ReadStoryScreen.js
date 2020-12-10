import * as React from "react";
import { Header, SearchBar } from "react-native-elements";
import { View, StyleSheet, Text, FlatList } from "react-native";
import db from "../config";
export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      search: "",
      dataSource: [],
    };
  }

  updateSearch = (search) => {
    this.setState({ search: search });
  };

  searchFilter = (text) => {
    const newData = this.state.allStories.filter((item) => {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  };

  retrieveStories = async () => {
    console.log("inside retrieve stories....");
    try {
      var stories = [];
      db.collection("stories")
        .get()
        .then((story) => {
          story.forEach((doc) => {
            stories.push(doc.data());
          });
          console.log(stories);
          console.log("got data....");
          this.setState({ allStories: stories });
          this.setState({ dataSource: stories });
        });
      console.log(this.state.allStories);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveStories();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={"#f38181"}
          centerComponent={{
            text: "Story Hub",
            style: { fontSize: 28, color: "#fff" },
          }}
        />
        <View style={styles.container}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text) => this.searchFilter(text)}
            onClear={(text) => this.searchFilter("")}
            value={this.state.search}
          />
          <FlatList
            data={
              this.state.search === ""
                ? this.state.allStories
                : this.state.dataSource
            }
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text>Title: {item.title}</Text>
                <Text>Author : {item.author}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fce38a",
  },
  itemContainer: {
    height: 80,
    width: "100%",
    borderWidth: 2,
    borderColor: "pink",
    justifyContent: "center",
    alignSelf: "center",
  },
});
