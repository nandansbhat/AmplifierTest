import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewBase,
  FlatList,
  Alert
} from "react-native";
import Header from "./components/Header";
import { uuid } from "uuidv4";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";
import Database from "./Database";
const db = new Database();

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try{getItemSQL();} catch(e) {console.log(e)}
  }, []);

  const thelist = [];

  const [isLoading, setIsLoading] = useState(false);
  //   const deleteItem = id => {
  //     console.log("Some Item Deleted");
  //     setItems(prevItems => {
  //       return prevItems.filter(item => item.id != id);
  //     });
  //   };

  const getItemSQL = () => {
    console.log("Getting items from SQL lite......begun.");
    try{db.listItem().then(data => {
        console.log(
          "...............................Let us have a look at the list"
        );
        console.log(data);
        console.log("inside the listItem,getItem");
        console.log("data from list item " + data.id, data.itemName);
        setItems(data);
        console.log(data);
      });}
    catch(e){console.log(e)}
    
    
    
    console.log("Fuckin display this, cache must be cleared  items");
    console.log(items);
    console.log("Getting items from SQL lite ........done");
  };

  const deleteItemSQL = id => {
    setIsLoading(true);
    console.log(id);
    console.log("deleting items from SQL lite.......begun");
    try{db.deleteItem(id).then(() => {
        setIsLoading(false);
      });} catch (e){console.log(e)}
    console.log("deleting items from SQL lite.......done");
    try {
      getItemSQL();
    } catch (e) {
      console.log(e);
    }
  };

  const addItemSQL = item => {
    setIsLoading(true);
    console.log("Adding item " + item + "to SQL lite..... begun");
    
    try{db.addItem(item);} catch(e) {console.log(e)}
    console.log("Adding item to SQL lite..... done");
    try {
      getItemSQL();
    } catch (e) {
      console.log(e);
    }
  };

  //   const addItem = item => {
  //     console.log("Item Added");
  //     console.log(item);
  //     if (!item) {
  //       Alert.alert("Hold up! You cannot leave it blank");
  //     } else {
  //       setItems(prevItems => {
  //         return [{ id: uuid(), text: item }, ...prevItems];
  //       });
  //     }
  //   };

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem={addItemSQL} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem item={item} deleteItem={deleteItemSQL} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
