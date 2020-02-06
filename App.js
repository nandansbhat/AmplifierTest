import React, { useState } from "react";
import { View, Text, StyleSheet, ViewBase, FlatList, Alert } from "react-native";
import Header from "./components/Header";
import { uuid } from "uuidv4";
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'
const App = () => {
  const [items, setItems] = useState([
    { id: uuid(), text: "Milk" },
    { id: uuid(), text: "Eggs" },
    { id: uuid(), text: "Oil" },
    { id: uuid(), text: "Cheese" }
  ]);

const deleteItem = (id) => {
    console.log('Some Item Deleted')
    setItems(prevItems => {
        return prevItems.filter(item => item.id != id)
    })
} 

const addItem = (item) => {
   console.log('Item Added');
   console.log(item);
   if(!item){
Alert.alert("Hold up! You cannot leave it blank")
   }
   else{
    setItems(prevItems => {
        return  [{id: uuid(),text: item},...prevItems]
    } );
   }
   
} 
  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem ={addItem}/>
      <FlatList data={items} renderItem={({item})=> (<ListItem item= {item} deleteItem={deleteItem}/>)}/>
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
