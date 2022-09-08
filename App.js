import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import Button from "./components/Button";

export default function App() {
  const [JSON_DATA, setJSON_DATA] = useState("");
  const [showIndicator, setShowIndicator] = useState(true);
  const [TextValue, setTextValue] = useState();

  useEffect(() => {
    async function fetchData() {
      fetch("https://jsonplaceholder.typicode.com/todos/")
        .then((response) => response.json())
        .then((responseJson) => {
          setJSON_DATA(responseJson);
          setShowIndicator(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData();
  }, []);

  const ItemRender = ({ title }) => (
    <View style={StyleSheet.listItem}>
      <Text style={StyleSheet.itemText}> {title} </Text>
    </View>
  );
  const divider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "black",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="red"
        animating={showIndicator}
        style={StyleSheet.activityIndicator}
      />
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text>Thank You for Helping</Text>
          <Image
            source={require("./assets/expenses.jpg")}
            style={{ width: "80%", height: 200 }}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Comments"
            multiline={true}
            style={{
              width: "80%",
              height: 100,
              paddingLeft: 10,
              textAlign: "justify",
              backgroundColor: "lightgrey",
              borderRadius: 8,
            }}
            value={TextValue}
            onChangeText={(value) => setTextValue(value)}
          />
          <Button
            tittle={"Done"}
            onPress={
              TextValue
                ? () => console.log(TextValue)
                : () => Alert.alert("Warning", "Kindly fill the comment")
            }
            color={TextValue ? "lightblue" : "lightgrey"}
          />
        </View>
        <FlatList
          data={JSON_DATA}
          renderItem={({ item }) => <ItemRender title={item.title} />}
          ItemSeparatorComponent={divider}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  listItem: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },

  itemText: {
    fontSize: 24,
    color: "black",
  },
  activityIndicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
